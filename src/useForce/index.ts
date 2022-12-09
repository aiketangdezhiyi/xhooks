import { useCallback, useState } from 'react';

// 提供一个强制刷新函数
export const useForce = () => {
  const [, setForce] = useState(-1);
  const refresh = useCallback(() => {
    setForce(Math.random());
  }, []);

  return {
    refresh,
  };
};
