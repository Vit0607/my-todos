import { useRef } from 'react';

export function useDebounce(callback: Function, delay: number) {
  const timerId = useRef<number | null>(null);

  return (...args: any[]) => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
