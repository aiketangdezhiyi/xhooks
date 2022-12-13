import { ReactNode, useMemo } from 'react';
import { boundaryMax, boundaryMin } from 'yuxuannnn_utils';

export type virtualListType = {
  /** 起始渲染的元素的索引 */
  startIdx: number;
  /** 最终渲染元素的索引 */
  endIdx: number; //
  /** 起始元素的偏离位置 */
  startDomLeft: number;
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
  return useMemo(() => {
    const { startIdx, endIdx, startDomLeft } = getTransverseVirtualListInfo(
      options.width,
      options.left,
      options.containerWidth,
      originList.length,
    );
    let restVirtualList: ReactNode[] = [];
    for (let i = startIdx, j = 0; i <= endIdx; i++, j++) {
      restVirtualList.push(
        renderItem({
          origin: originList[i],
          left: startDomLeft + options.width * j,
          idx: i,
        }),
      );
    }
    return restVirtualList;
  }, [originList, renderItem, options.width, options.left, options.containerWidth]);
}
