import {
  BehaviorSubject, combineLatest, timer, of,
} from 'rxjs';
import {
  multicast, pluck, switchMap, map,
} from 'rxjs/operators';
import { refCountDelay } from 'rxjs-etc/operators';
import { memoize } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../../lib/constants';

export default (store) => {
  // eslint-disable-next-line no-underscore-dangle
  const watchAsObservable = (getter, options) => store._watcherVM.$watchAsObservable(
    () => getter(store.state, store.getters),
    options,
  );

  const sdk$ = watchAsObservable(({ sdk }) => sdk, { immediate: true })
    .pipe(
      pluck('newValue'),
    );

  const getBalance = memoize(address => sdk$
    .pipe(
      switchMap(sdk => timer(0, 3000).pipe(map(() => sdk))),
      switchMap(async sdk => BigNumber(sdk ? await sdk.balance(address).catch(() => 0) : 0)
        .shiftedBy(-MAGNITUDE)),
      multicast(new BehaviorSubject(BigNumber(0))),
      refCountDelay(1000),
    ));

  const getAccounts = accountsGetter => watchAsObservable(accountsGetter, { immediate: true })
    .pipe(
      pluck('newValue'),
      switchMap(acs => (acs.length
        ? combineLatest(acs.map(({ address }) => getBalance(address)))
          .pipe(map(balances => balances.map((balance, idx) => ({ ...acs[idx], balance }))))
        : of([]))),
    );

  const accounts$ = getAccounts(({ accounts: { list } }) => list);

  const normalizeTransaction = async ({
    blockHash, time, tx: { amount, fee, ...otherTx }, ...otherTransaction
  }) => ({
    ...otherTransaction,
    blockHash,
    time: new Date(time || (await store.state.sdk.api.getMicroBlockHeaderByHash(blockHash)).time),
    tx: {
      ...otherTx,
      amount: BigNumber(amount).shiftedBy(-MAGNITUDE),
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

  const topBlockHeight$ = sdk$
    .pipe(
      switchMap(sdk => timer(0, 30000).pipe(map(() => sdk))),
      switchMap(async sdk => (sdk ? (await sdk.topBlock()).height : 0)),
      multicast(new BehaviorSubject(0)),
      refCountDelay(1000),
    );

  const activeAccountAddress$ = watchAsObservable(
    (state, getters) => getters['accounts/active'].address, { immediate: true },
  )
    .pipe(pluck('newValue'));

  let transactions = {};

  sdk$.subscribe(() => { transactions = {}; });

  const registerTx = (tx) => { transactions[tx.hash] = tx; };

  const getTransaction = transactionHash$ => combineLatest([
    activeAccountAddress$, topBlockHeight$, transactionHash$, sdk$,
  ])
    .pipe(
      switchMap(async ([address, height, hash, sdk]) => {
        const tx = transactions[hash]
          || await normalizeTransaction(
            await sdk.api.getTransactionByHash(hash),
          );
        registerTx(tx);
        return ({
          ...setTransactionFieldsRelatedToAddress(tx, address),
          confirmationCount: height - tx.blockHeight,
        });
      }),
    );

  store.state.observables = { // eslint-disable-line no-param-reassign
    topBlockHeight: topBlockHeight$,
    getBalance,
    getTransaction,
    activeAccount: watchAsObservable(
      (state, getters) => getters['accounts/active'],
      { immediate: true, deep: true },
    )
      .pipe(
        pluck('newValue'),
        switchMap(acc => (acc
          ? getBalance(acc.address).pipe(map(balance => ({ ...acc, balance })))
          : of(acc))),
      ),
    accounts: accounts$,
    inactiveAccounts: getAccounts(
      ({ accounts: { list, activeIdx } }) => [
        ...list.slice(0, activeIdx),
        ...list.slice(activeIdx + 1),
      ],
    ),
    totalBalance: accounts$.pipe(
      map(acs => acs.reduce((prev, { balance }) => prev.plus(balance), BigNumber(0))),
    ),
  };
};
