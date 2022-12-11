import { useMount, useDebounceFn, isBrowser } from '../';

/**
 * 这个hook会自动在组件开始时绑定窗口变化事件，并且在组件卸载的时候销毁事件
 * @param func 执行函数
 * @param debounceTime 防抖时间
 */
export const useWindowResize = (func: Function, debounceTime?: number) => {
  const { run } = useDebounceFn(func, {
    wait: debounceTime,
  });

  useMount(() => {
    if (isBrowser) {
      window.addEventListener('resize', run);
    }

    return () => {
      if (isBrowser) {
        window.addEventListener('resize', run);
      }
    };
  });
};
