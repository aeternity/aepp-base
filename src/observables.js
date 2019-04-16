import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import {
  multicast, refCount, pluck, switchMap, map,
} from 'rxjs/operators';
import { memoize } from 'lodash-es';
import BigNumber from 'bignumber.js';
import store from './store';
import { MAGNITUDE } from './lib/constants';

// eslint-disable-next-line no-underscore-dangle
const watchAsObservable = store._vm.$watchAsObservable.bind(store._vm);

export const topBlockHeight = new Observable((subscriber) => {
  let unsubscribed = false;
  const f = async () => {
    if (unsubscribed) return;
    try {
      subscriber.next((await store.state.sdk.topBlock()).height);
    } catch (e) {
      subscriber.next(0);
    }
    setTimeout(f, 30000);
  };
  f();

  return () => { unsubscribed = true; };
}).pipe(
  multicast(new BehaviorSubject(0)),
  refCount(),
);

export const getBalance = memoize((address) => {
  const observable = new Observable((subscriber) => {
    let unsubscribed = false;
    const f = async () => {
      if (unsubscribed) return;
      subscriber.next(
        BigNumber(
          await store.state.sdk.balance(address).catch(() => 0),
        )
          .shiftedBy(-MAGNITUDE),
      );
      setTimeout(f, 3000);
    };
    f();

    return () => { unsubscribed = true; };
  });
  const subject = new BehaviorSubject(BigNumber(0));
  return observable.pipe(multicast(subject), refCount());
});

const getAccounts = accountsGetter => watchAsObservable(accountsGetter, { immediate: true })
  .pipe(
    pluck('newValue'),
    switchMap(acs => combineLatest(acs.map(({ address }) => getBalance(address)))
      .pipe(map(balances => balances.map((balance, idx) => ({ ...acs[idx], balance }))))),
  );

export const accounts = getAccounts('identities');

export const activeAccount = watchAsObservable('activeIdentity', { immediate: true })
  .pipe(
    pluck('newValue'),
    switchMap(acc => getBalance(acc.address).pipe(map(balance => ({ ...acc, balance })))),
  );

export const inactiveAccounts = getAccounts(
  ({ identities, $data: { $$state: { selectedIdentityIdx } } }) => [
    ...identities.slice(0, selectedIdentityIdx),
    ...identities.slice(selectedIdentityIdx + 1),
  ],
);

export const totalBalance = accounts.pipe(
  map(acs => acs.reduce((prev, { balance }) => prev.plus(balance), BigNumber(0))),
);
