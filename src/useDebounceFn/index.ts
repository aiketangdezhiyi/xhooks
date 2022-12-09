import { useCallback } from 'react';
import { useLatest } from '../';
import { debounce } from 'yuxuannnn_utils';

/**
 * 对某个函数进行
 */
export const useDebounceFn = (fn: Function, options?: { wait?: number }) => {
  const fnRef = useLatest(fn); // 实时获取最新的函数引用

  const wait = options?.wait || 300; // 等待时间，单位为毫秒

  const fnWithDebounce = useCallback(
    debounce((...args: any[]) => {
      const result = fnRef.current(args);
      return result;
    }, wait),
    [],
  );
  return {
    run: fnWithDebounce,
  };
};
