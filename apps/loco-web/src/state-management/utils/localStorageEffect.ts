import { AtomEffect } from 'recoil';

export const localStorageEffect =
  (key: string, type: 'object' | 'string'): AtomEffect<any> =>
  ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (type === 'object') {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
      });

      return;
    }

    if (type === 'string') {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(savedValue);
      }

      onSet((newValue, _, isReset) => {
        isReset ? localStorage.removeItem(key) : localStorage.setItem(key, newValue);
      });

      return;
    }
  };
