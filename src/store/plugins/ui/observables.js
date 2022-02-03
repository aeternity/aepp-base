import {
  Observable, BehaviorSubject, combineLatest, timer, of, concat, interval,
} from 'rxjs';
import {
  multicast, pluck, switchMap, map, filter, startWith, catchError,
} from 'rxjs/operators';
import { refCountDelay } from 'rxjs-etc/operators';
import { memoize } from 'lodash-es';
import BigNumber from 'bignumber.js';
import Swagger from 'swagger-client';
import { MAGNITUDE } from '../../../lib/constants';
import { handleUnknownError, isAccountNotFoundError } from '../../../lib/utils';
import { fetchJson } from '../../utils';
import currencyAmount from '../../../filters/currencyAmount';
import prefixedAmount from '../../../filters/prefixedAmount';

export default (store) => {
  // eslint-disable-next-line no-underscore-dangle
  const watchAsObservable = (getter, options) => store._watcherVM.$watchAsObservable(
    () => getter(store.state, store.getters),
    options,
  );

  const sdk$ = watchAsObservable(({ sdk }) => (sdk && sdk.then ? null : sdk), { immediate: true })
    .pipe(
      pluck('newValue'),
    );

  const defaultAccountInfo = { balance: BigNumber(0), nonce: 0 };
  const getAccountInfo = memoize((address) => sdk$
    .pipe(
      switchMap((sdk) => timer(0, 3000).pipe(map(() => sdk))),
      switchMap((sdk) => (sdk
        ? sdk.api.getAccountByPubkey(address).catch((error) => {
          if (!isAccountNotFoundError(error)) {
            handleUnknownError(error);
          }
          return defaultAccountInfo;
        })
        : Promise.resolve(defaultAccountInfo))),
      map((aci) => ({ ...aci, balance: BigNumber(aci.balance).shiftedBy(-MAGNITUDE) })),
      multicast(new BehaviorSubject(defaultAccountInfo)),
      refCountDelay(1000),
    ));

  const getAccounts = (accountsGetter) => watchAsObservable(accountsGetter, { immediate: true })
    .pipe(
      pluck('newValue'),
      switchMap((acs) => (acs.length
        ? combineLatest(acs.map(({ address }) => getAccountInfo(address)))
          .pipe(map((acis) => acis.map((aci, idx) => ({ ...acs[idx], ...aci }))))
        : of([]))),
    );

  const accounts$ = getAccounts(({ accounts: { list } }) => list);

  const normalizeTransaction = ({
    blockHash, time, tx: { amount, fee, ...otherTx }, ...otherTransaction
  }) => ({
    ...otherTransaction,
    blockHash,
    ...time && { time: new Date(time) },
    tx: {
      ...otherTx,
      ...amount !== undefined && { amount: BigNumber(amount).shiftedBy(-MAGNITUDE) },
      fee: BigNumber(fee).shiftedBy(-MAGNITUDE),
    },
  });

  const setTransactionFieldsRelatedToAddress = ({ tx, ...otherTransaction }, currentAddress) => ({
    ...otherTransaction,
    received: currentAddress === tx.recipientId,
    peerId: currentAddress === tx.recipientId
      ? tx.senderId
      : tx.recipientId,
    tx,
  });

  const createSdkObservable = (func, def) => sdk$
    .pipe(
      switchMap((sdk) => timer(0, 30000).pipe(map(() => sdk))),
      switchMap(async (sdk) => (sdk ? func(sdk) : def)),
      multicast(new BehaviorSubject(def)),
      refCountDelay(1000),
    );
  const topBlockHeight$ = createSdkObservable(
    async (sdk) => (await sdk.api.getTopHeader()).height,
    0,
  );
  const middlewareStatus$ = createSdkObservable(
    (sdk) => sdk.middlewareNew.api.getStatus().catch((error) => {
      handleUnknownError(error);
      return null;
    }),
    { loading: true },
  );

  const activeAccountAddress$ = watchAsObservable((state, getters) => getters['accounts/active'].address, { immediate: true })
    .pipe(pluck('newValue'));

  const referenceCurrency = 'aeternity';

  const rate$ = watchAsObservable(
    ({ currencies: { activeCode } }) => activeCode,
    { immediate: true },
  )
    .pipe(
      pluck('newValue'),
      switchMap((p) => timer(0, 60000).pipe(map(() => p))),
      switchMap(async (activeCode) => {
        const url = new URL('https://api.coingecko.com/api/v3/simple/price');
        url.searchParams.set('ids', referenceCurrency);
        url.searchParams.set('vs_currencies', activeCode);
        return (await fetchJson(url))[referenceCurrency][activeCode];
      }),
      multicast(new BehaviorSubject(0)),
      refCountDelay(1000),
    );

  const convertAmount = (amountAeGetter, overrideSwapped) => watchAsObservable(
    ({ currencies }, getters) => ({
      amount: amountAeGetter(),
      swapped: overrideSwapped !== undefined ? overrideSwapped : currencies.swapped,
      active: getters['currencies/active'],
    }),
    { immediate: true },
  )
    .pipe(
      pluck('newValue'),
      switchMap((args) => (args.swapped
        ? rate$.pipe(map((rate) => ({ ...args, amount: args.amount.multipliedBy(rate) })))
        : Promise.resolve(args))),
      map(({ swapped, amount, active }) => currencyAmount(
        ...swapped ? [amount, active] : [prefixedAmount(amount), { symbol: 'AE' }],
      )),
    );

  let transactions = {};
  let transactionsByAddress = {};

  sdk$.subscribe(() => {
    transactions = {};
    transactionsByAddress = {};
  });

  const registerTx = (tx) => { transactions[tx.hash] = tx; };

  const addConvertedAmount = (tx) => (tx.tx.amount
    ? convertAmount(() => tx.tx.amount)
      .pipe(map((convertedAmount) => ({ ...tx, convertedAmount })))
    : Promise.resolve(tx));

  const getTransaction = (transactionHash$) => combineLatest([
    activeAccountAddress$, topBlockHeight$, transactionHash$, sdk$,
  ])
    .pipe(
      switchMap(async ([address, height, hash, sdk]) => {
        let tx;
        if (transactions[hash]) {
          tx = transactions[hash];
        } else {
          if (!sdk) return null;
          tx = await sdk.api.getTransactionByHash(hash);
          tx.pending = tx.blockHash === 'none';
          tx.time = !tx.pending && (await sdk.api.getMicroBlockHeaderByHash(tx.blockHash)).time;
          tx = normalizeTransaction(tx);
          if (!tx.pending) registerTx(tx);
        }
        return {
          ...setTransactionFieldsRelatedToAddress(tx, address),
          confirmationCount: height - tx.blockHeight,
        };
      }),
      switchMap((tx) => (tx ? addConvertedAmount(tx) : Promise.resolve(tx))),
    );

  const fetchMdwTransactions = async ({ address, limit, next }) => {
    const nextUrl = store.getters.currentNetwork.middlewareUrl + next;
    const response = next
      ? store.state.sdk.middlewareNew.responseInterceptor(
        await Swagger.serializeRes(await fetch(nextUrl), nextUrl),
      ).body
      : await store.state.sdk.middlewareNew.api
        .getTxsByDirection('backward', { account: address, limit });
    const data = response.data
      .map(({ microTime, ...tx }) => ({ ...tx, time: microTime }))
      .map(normalizeTransaction);
    data.forEach(registerTx);
    return { data, next: response.next };
  };

  const fetchPendingTransactions = async (address) => (
    await store.state.sdk.api.getPendingAccountTransactionsByPubkey(address)
      .then((r) => r.transactions)
      .catch((error) => {
        if (!isAccountNotFoundError(error)) {
          handleUnknownError(error);
        }
        return [];
      })
  ).map((tx) => normalizeTransaction({ ...tx, pending: true }));

  const voidWrapper = (f) => (...args) => { f(...args); };

  const getTransactionList = (loadMore$) => {
    const limit = 15;
    let lastStatus = 'complete';
    return combineLatest([
      concat(
        of('initial'),
        loadMore$.pipe(
          filter(() => ['complete', 'ended'].includes(lastStatus)),
          map(() => 'loadMore'),
        ),
      ),
      activeAccountAddress$,
      sdk$.pipe(filter((sdk) => sdk)),
    ])
      .pipe(
        switchMap(([mode, address]) => concat(of(-1), interval(5000)).pipe(
          map((idx) => idx + 1),
          map((idx) => [idx ? 'poll' : mode, address]),
        )),
        switchMap(([mode, address]) => new Observable(voidWrapper(async (subscriber) => {
          try {
            let txState = transactionsByAddress[address];
            const emit = (status) => {
              const { pending, list } = txState;
              lastStatus = status;
              subscriber.next({
                list: pending.concat(list)
                  .map((tx) => setTransactionFieldsRelatedToAddress(tx, address)),
                status,
              });
            };

            switch (mode) {
              case 'initial':
              case 'loadMore': {
                const isNewState = !txState;
                if (isNewState) txState = { pending: [], list: [] };
                else if (!txState.next) {
                  emit('ended');
                  break;
                }
                emit('loading');
                await Promise.all([
                  (async () => {
                    if (!isNewState) return;
                    txState.pending = await fetchPendingTransactions(address);
                  })(),
                  (async () => {
                    if (mode === 'initial' && !isNewState) return;
                    const txs = await fetchMdwTransactions(
                      isNewState ? { address, limit } : { next: txState.next },
                    );
                    txState.list.push(...txs.data);
                    txState.next = txs.next;
                  })(),
                ]);
                emit(txState.next ? 'complete' : 'ended');
                break;
              }
              case 'poll': {
                const [pending, prepend] = await Promise.all([
                  fetchPendingTransactions(address),
                  (async () => {
                    const { data, next: nextI } = await fetchMdwTransactions({ address, limit: 1 });
                    const firstHash = txState.list[0]?.hash;
                    if (firstHash === data[0]?.hash) return [];
                    let next = nextI;
                    while (next) {
                      // eslint-disable-next-line no-await-in-loop
                      const tx = await fetchMdwTransactions({ next });
                      if (firstHash === tx.data[0].hash) return [];
                      data.push(tx.data[0]);
                      next = tx.next;
                    }
                    return data;
                  })(),
                ]);
                txState.pending = pending;
                txState.list.unshift(...prepend);
                emit(lastStatus);
                break;
              }
              default:
                throw new Error(`Invalid mode: ${mode}`);
            }
            transactionsByAddress[address] = txState;

            subscriber.complete();
          } catch (error) {
            subscriber.error(error);
          }
        }))),
        switchMap(({ list, status }) => (
          list.length ? combineLatest(list.map(addConvertedAmount)) : of([])
        ).pipe(
          map((txs) => ({ list: txs, status })),
          startWith({ list, status }),
        )),
        startWith({ list: [], status: 'loading' }),
        catchError((error) => {
          handleUnknownError(error);
          return of({ list: [], status: 'error' });
        }),
      );
  };

  store.state.observables = { // eslint-disable-line no-param-reassign
    topBlockHeight: topBlockHeight$,
    middlewareStatus: middlewareStatus$,
    getTransaction,
    getTransactionList,
    activeAccount: watchAsObservable(
      (state, getters) => getters['accounts/active'],
      { immediate: true, deep: true },
    )
      .pipe(
        pluck('newValue'),
        switchMap((acc) => (acc
          ? getAccountInfo(acc.address).pipe(map((acci) => ({ ...acc, ...acci })))
          : of(acc))),
      ),
    accounts: accounts$,
    inactiveAccounts: getAccounts(
      ({ accounts: { list, activeIdx } }) => [
        ...list.slice(0, activeIdx),
        ...list.slice(activeIdx + 1),
      ],
    ),
    getAccounts,
    totalBalance: accounts$.pipe(
      map((acs) => acs.reduce((prev, { balance }) => prev.plus(balance), BigNumber(0))),
    ),
    rate: rate$,
    convertAmount,
  };
};
