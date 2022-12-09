import { useCallback, useRef } from 'react';
import { throttle } from 'yuxuannnn_utils';
import { useLatest } from '../';

export function useThrottleFn(fn: Function, options: { wait: number }) {
  const fnRef = useLatest(fn);
  const wait = options?.wait || 300;

  const throttled = useCallback(
    throttle((...args: any[]) => {
      return fnRef.current(...args); // 对函数进行二次封装的目的是为了保证函数引用发生改变依然可以引用到最新的函数
    }, wait),
    [],
  );

  return {
    run: throttled,
  };
}
