import { isEqual } from 'lodash-es';

const NativePromise = window.Promise;

const genId = () => Math.random().toString().slice(2);

function logging(contentWindow, value, recordedActions) {
  const res = wrapWithRecordingProxy(contentWindow, value, recordedActions);
  console.log(value, 'wrapped to', res);
  return res;
}

function wrapWithRecordingProxy(contentWindow, value, recordedActions) {
  switch (typeof value) {
    case 'undefined':
    case 'boolean':
    case 'number':
    case 'string':
    case 'bigint':
      return [value, { value }];
    case 'function':
    case 'object':
      if (value == null) return [value, { value }];

      if (contentWindow.Buffer && value instanceof contentWindow.Buffer) {
        return [value, { type: 'buffer', value: value.toString('base64') }];
      }

      if (value instanceof contentWindow.Uint8Array) {
        return [value, { type: 'Uint8Array', value: Array.from(value) }];
      }

      if (value instanceof contentWindow.ArrayBuffer) {
        return [value, { type: 'ArrayBuffer', value: Array.from(Uint8Array.from(value)) }];
      }

      if (value instanceof contentWindow.Error) {
        return [value, { type: 'error', value: value.message }];
      }

      if (value instanceof contentWindow.Array) {
        const items = value.map((i) => logging(contentWindow, i, recordedActions));
        return [items.map(([v]) => v), { type: 'array', value: items.map(([v, s]) => s) }];
      }

      if (value instanceof NativePromise || value instanceof Promise) {
        const complexValue = { type: 'promise' };
        const val = value.then(
          (value) => {
            const [v, s] = logging(contentWindow, value, recordedActions);
            complexValue.resolve = s;
            return v;
          },
          (error) => {
            const [v, s] = logging(contentWindow, error, recordedActions);
            complexValue.reject = s;
            return v;
          },
        );
        return [val, complexValue];
      }

      try {
        const s = JSON.parse(JSON.stringify(value));
        if (isEqual(value, s)) return [value, { value: JSON.parse(JSON.stringify(value)) }];
      } catch {}

      const proxyId = genId();
      const proxy = new contentWindow.Proxy(value, {
        ...Object.fromEntries([
          'get', 'apply', 'has', 'construct', 'defineProperty', 'deleteProperty', 'getOwnPropertyDescriptor',
          'isExtensible', 'ownKeys', 'preventExtensions', 'set', 'setPrototypeOf',
        ].map((name) => [name, () => { throw new Error(`${name} proxy request`); }])),
        // getPrototypeOf
        get(target, property, receiver) {
          let value;
          try {
            value = contentWindow.Reflect.get(target, property, receiver);
          } catch {
            value = contentWindow.Reflect.get(target, property);
          }
          value = [
            'getDevices', 'requestDevice', 'addEventListener',
            'transferOut', 'transferIn', 'open', 'close', 'claimInterface', 'reset',
          ].includes(property) ? value.bind(target) : value;
          const [wrapped, ser] = logging(contentWindow, value, recordedActions);
          recordedActions.push({ proxyId, action: 'get', property, value: ser });
          console.log('get', ...arguments, 'result', wrapped);
          return wrapped;
        },
        apply(target, thisArg, argArray) {
          const value = contentWindow.Reflect.apply(target, thisArg, argArray);
          const [wrapped, ser] = logging(contentWindow, value, recordedActions);
          recordedActions.push({
            proxyId,
            action: 'apply',
            arguments: argArray.map((arg) => logging(contentWindow, arg, recordedActions)[1]),
            value: ser,
          });
          console.log('apply', ...arguments, 'result', wrapped);
          return wrapped;
        }
      });
      return [proxy, { type: 'proxy', id: proxyId }];
    default:
      throw new Error(`Unsupported value type: ${typeof value}`);
  }
}

const contentWindow = window;
const recordedApi = [];

const wrappedUsb = logging(contentWindow, contentWindow.navigator.usb, recordedApi);
contentWindow.Object.defineProperty(contentWindow.navigator, 'usb', { value: wrappedUsb[0] });
console.log('contentWindow.navigator.usb', contentWindow.navigator.usb);
contentWindow.recordedApi = recordedApi;

export const t = 10;
