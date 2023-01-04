import { useState } from 'react';

interface useLocalStorageProps<T> {
  key: string;
  initialState: T;
}

export const useLocalStorage = <T,>({
  key,
  initialState,
}: useLocalStorageProps<T>): [T, <T>(value: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item != null ? JSON.parse(item) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  function setValue<T>(value: T): void {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, setValue];
};
