import React, { useEffect, useState } from 'react';

type TNotFn = string | boolean | number | bigint | object;
type TUseLocalStorageReturnType<T> = [value: T, setValue: React.Dispatch<React.SetStateAction<T>>];

function useLocalStorage<T>(
  initialValue: TNotFn | (() => any),
  key: string
): TUseLocalStorageReturnType<T> {
  const [value, setValue] = useState<T>(() => {
    const existValue = localStorage.getItem(key);
    if (existValue) return JSON.parse(existValue);
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
