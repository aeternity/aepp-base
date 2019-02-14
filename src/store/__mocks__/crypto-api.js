import { set } from 'lodash-es';

set(window, 'crypto.getRandomValues', () => {});
