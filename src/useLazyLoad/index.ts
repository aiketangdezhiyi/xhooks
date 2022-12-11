import { useRef, useState } from 'react';
import { isBrowser, useMount } from '../';

/**
 *
 * @param targetData 目标数据量
 * @param add 每次增加的数据值
 */

const interval = 1000 / 60;

// 延迟装载的hook 可以让你的网页做到秒级启动
export function useLazyLoad<T = any>(targetData: T[], add: number) {
  const [restData, setRestData] = useState(targetData.slice(0, add));
  const lastIdx = useRef(add);
  useMount(() => {
    function loadData() {
      if (lastIdx.current >= targetData.length) return;
      if (isBrowser) {
        requestAnimationFrame(() => {
          lastIdx.current += add;
          setRestData(targetData.slice(0, lastIdx.current));
          loadData();
        });
      } else {
        setTimeout(() => {
          lastIdx.current += add;
          setRestData(targetData.slice(0, lastIdx.current));
          loadData();
        }, interval);
      }
    }
    loadData();
  });

  return restData;
}

/**
 * 辅助函数:帮助你计算多少帧内全部渲染完成
 */
export const getAddParam = (length: number, frameCount: number) => {
  return Math.ceil(length / frameCount);
};
