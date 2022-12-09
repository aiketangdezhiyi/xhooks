import { useEffect } from 'react';
import { useLatest } from '../';

export const useEventListener = (
  eventName: string,
  handle: (...args: any) => void,
  options: {
    target: HTMLElement | Element | Window | Document;
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
  },
) => {
  const fnRef = useLatest(handle);
  const { target, ...restOpt } = options;
  useEffect(() => {
    const handle = (e: Event) => {
      fnRef.current.call(target, e);
    };

    target?.addEventListener(eventName, handle, restOpt);

    return () => {
      target?.removeEventListener(eventName, handle, {
        capture: options.capture,
      });
    };
  }, [eventName, options.target, options.capture, options.passive]);
};
