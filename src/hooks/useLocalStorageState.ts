import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  key: string,
): readonly [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
