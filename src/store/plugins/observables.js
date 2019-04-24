import {
  BehaviorSubject, combineLatest, timer, of,
} from 'rxjs';
import {
  multicast, pluck, switchMap, map,
} from 'rxjs/operators';
import { refCountDelay } from 'rxjs-etc/operators';
import { memoize } from 'lodash-es';
import BigNumber from 'bignumber.js';
import { MAGNITUDE } from '../../lib/constants';

export default (store) => {
  // eslint-disable-next-line no-underscore-dangle
  const watchAsObservable = (getter, options) => store._watcherVM.$watchAsObservable(
    () => getter(store.state, store.getters),
    options,
  );

  const sdk = watchAsObservable(({ sdk: s }) => s, { immediate: true })
    .pipe(
      pluck('newValue'),
    );

  const getBalance = memoize(address => sdk
    .pipe(
      switchMap(s => timer(0, 3000).pipe(map(() => s))),
      switchMap(async s => BigNumber(s ? await s.balance(address).catch(() => 0) : 0)
        .shiftedBy(-MAGNITUDE)),
      multicast(new BehaviorSubject(BigNumber(0))),
      refCountDelay(1000),
    ));

  const getAccounts = accountsGetter => watchAsObservable(accountsGetter, { immediate: true })
    .pipe(
      pluck('newValue'),
      switchMap(acs => combineLatest(acs.map(({ address }) => getBalance(address)))
        .pipe(map(balances => balances.map((balance, idx) => ({ ...acs[idx], balance }))))),
    );

  const accountsObservable = getAccounts((state, { accounts }) => accounts);

  store.state.observables = { // eslint-disable-line no-param-reassign
    topBlockHeight: sdk
      .pipe(
        switchMap(s => timer(0, 30000).pipe(map(() => s))),
        switchMap(async s => (s ? (await s.topBlock()).height : 0)),
        multicast(new BehaviorSubject(0)),
        refCountDelay(1000),
      ),
    getBalance,
    activeAccount: watchAsObservable(
      (state, { activeIdentity }) => activeIdentity,
      { immediate: true },
    )
      .pipe(
        pluck('newValue'),
        switchMap(acc => (acc
          ? getBalance(acc.address).pipe(map(balance => ({ ...acc, balance })))
          : of(acc))),
      ),
    accounts: accountsObservable,
    inactiveAccounts: getAccounts(
      ({ selectedAccountIdx }, { accounts }) => [
        ...accounts.slice(0, selectedAccountIdx),
        ...accounts.slice(selectedAccountIdx + 1),
      ],
    ),
    totalBalance: accountsObservable.pipe(
      map(acs => acs.reduce((prev, { balance }) => prev.plus(balance), BigNumber(0))),
    ),
  };
};
