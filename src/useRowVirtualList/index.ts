import { ReactNode, useMemo } from 'react';
import { boundaryMax, boundaryMin } from 'yuxuannnn_utils';

export type virtualListType = {
  startIdx: number; // 起始渲染的元素的索引
  endIdx: number; // 最终渲染元素的索引
  startDomLeft: number; // 其实元素的偏离位置
};

/**
 * 获取横向虚拟列表的一些信息
 * 简单一点 元素的宽高是固定，非动态
 * 第一步 我先知道我要渲染第几个元素 渲染结束的索引 距离开始的位置是多少
 * @param width 每一个元素的宽度
 * @param left 当前定位的左边界
 * @param offsetWith 容器元素展示区域的宽度
 * @param reality 渲染的真实数量
 */
export const getTransverseVirtualListInfo = (
  width: number,
  left: number,
  offsetWith: number,
  reality: number,
): virtualListType => {
  const startIdx = boundaryMin(Math.floor(left / width) - 10, 0);
  const endIdx = boundaryMax(Math.ceil((left + offsetWith) / width) + 10, reality - 1);

  const startDomLeft = startIdx * width;

  return {
    startIdx,
    endIdx,
    startDomLeft,
  };
};

export function useRowVirtualList<T = any>(
  originList: T[],
  renderItem: (params: { origin: T; left: number; idx: number }) => ReactNode,
  options: {
    /** 每一个元素的宽度 */
    width: number;
    /** 容器元素展示区域的宽度 */
    containerWidth: number;
    /** 外层容器的偏移量 */
    left: number;
  },
) {
  const allVirtualList = useRowOriginVirtualList(originList, renderItem, options);

  return useMemo(() => {
    const { startIdx, endIdx } = getTransverseVirtualListInfo(
      options.width,
      options.left,
      options.containerWidth,
      originList.length,
    );
    return allVirtualList.slice(startIdx, endIdx + 1);
  }, [allVirtualList, options.width, options.left, options.containerWidth]);
}

/**
 * 获取所有
 * @param originList
 * @param renderItem
 * @param options
 * @returns
 */
export function useRowOriginVirtualList<T = any>(
  originList: T[],
  renderItem: (params: { origin: T; left: number; idx: number }) => ReactNode,
  options: {
    /** 每一个元素的宽度 */
    width: number;
    /** 容器元素展示区域的宽度 */
    containerWidth: number;
  },
): ReactNode[] {
  const memoList = useMemo(() => {
    return originList.map((it, i) =>
      renderItem({
        origin: it,
        left: options.width * i,
        idx: i,
      }),
    );
  }, [originList, renderItem, options.width, options.containerWidth]);
  return memoList;
}
