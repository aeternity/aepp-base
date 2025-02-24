import { isEqual } from 'lodash-es';

const genId = () => Math.random().toString().slice(2);

function logging(contentWindow, value, recordedActions) {
  console.log('trying to wrap', value);
  const res = wrapWithRecordingProxy(contentWindow, value, recordedActions);
  console.log('wrapped to', res[1]);
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

      if (value instanceof contentWindow.Buffer) {
        return [value, { type: 'buffer', value: value.toString('base64') }];
      }

      if (value instanceof contentWindow.Error) {
        return [value, { type: 'error', value: value.message }];
      }

      if (value instanceof contentWindow.Promise) {
        const complexValue = { type: 'promise' };
        const val = value.then(
          (value) => {
            const [v, s] = logging(contentWindow, value, recordedActions);
            complexValue.resolve = s;
            return v;
          },
          (error) => {
            const [v, s] = logging(contentWindow, error, recordedActions);
            complexValue.resolve = s;
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
        get(target, prop, receiver) {
          const value = contentWindow.Reflect.get(target, prop, receiver);
          recordedActions.push({ proxyId, action: 'get', value: logging(contentWindow, value, recordedActions) });
          return result;
        },
        apply(target, thisArg, argArray) {
          const value = contentWindow.Reflect.apply(target, thisArg, argArray);
          recordedActions.push({
            proxyId,
            action: 'apply',
            arguments: argArray.map((arg) => logging(contentWindow, arg, recordedActions)[1]),
            value: logging(contentWindow, value, recordedActions),
          });
          return value;
        }
      });
      return [proxy, { type: 'proxy', id: proxyId }];
    default:
      throw new Error(`Unsupported value type: ${typeof value}`);
  }
}

describe('Ledger HW', () => {
  it('test', () => {
    cy.visit('/settings', { isDesktop: true });
    cy.window().then((contentWindow) => {
      const recordedApi = [];
        const wrappedUsb = logging(contentWindow, contentWindow.navigator.usb, recordedApi);
        // contentWindow.Object.defineProperty(contentWindow.navigator, 'usb', { value: wrappedUsb });
        contentWindow.Object.defineProperty(contentWindow.navigator, 'usb', { value: { test: 'qwerty' } });
        console.log('contentWindow.navigator.usb', contentWindow.navigator.usb);
        contentWindow.recordedApi = recordedApi;
        window.contentWindow = contentWindow;
    })
    cy.pause();
  });
});
