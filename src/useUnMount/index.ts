import { useEffect } from 'react';
import { useLatest } from '../';

export const useUnmount = (fn: Function) => {
  const onUnmountRef = useLatest(fn); // 保证函数变化时，函数始终是最新的

  useEffect(() => {
    return () => {
      onUnmountRef.current();
    };
  }, []);
};
