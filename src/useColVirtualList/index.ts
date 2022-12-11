import { ReactNode, useCallback } from 'react';
import { useRowVirtualList } from '../useRowVirtualList';

export function useColVirtualList<T = any>(
  originList: T[],
  renderItem: (params: { origin: T; top: number; idx: number }) => ReactNode,
  options: {
    /** 每一个元素的高度 */
    height: number;
    /** 容器元素展示区域的宽度 */
    containerHeight: number;
    /** 外层容器的偏移量 */
    top: number;
  },
) {
  const re = useCallback(
    (it: any) => {
      return renderItem({
        ...it,
        top: it.left,
      });
    },
    [renderItem],
  );

  return useRowVirtualList(originList, re, {
    left: options.top,
    width: options.height,
    containerWidth: options.containerHeight,
  });
}
