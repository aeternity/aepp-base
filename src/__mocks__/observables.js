import { Observable } from 'rxjs';
import * as mockData from '../stories/mock-data';

export const topBlockHeight = new Observable(subscriber => subscriber.next(100000));

export const getBalance = () => new Observable(
  subscriber => subscriber.next(mockData.amount),
);

export const accounts = new Observable(
  subscriber => subscriber.next(mockData.accounts),
);

export const activeAccount = new Observable(
  subscriber => subscriber.next(mockData.account),
);

export const inactiveAccounts = new Observable(
  subscriber => subscriber.next(mockData.accounts),
);

export const totalBalance = new Observable(
  subscriber => subscriber.next(mockData.amount),
);

export const test = 'mock';
