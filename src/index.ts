// ahooks
export * from './useSetState';
export * from './useLatest';
export * from './useDebounceFn';
export * from './useMount';
export * from './useUnMount';
export * from './useThrottleFn';
export * from './useEventListener';

// 自己封装的hook
export * from './useCounterControl';
export * from './useRowVirtualList';
export * from './useColVirtualList';
export * from './useForce';
export * from './useWindowResize';
export * from './useLazyLoad';

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
