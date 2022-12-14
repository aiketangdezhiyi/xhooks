import { useCallback, useState } from 'react';

export const useSetState = (initState: Object) => {
  const [state, setState] = useState(initState);

  const setMergeState = useCallback((patch: Function | Object) => {
    setState((prevState) => {
      const newState = typeof patch === 'function' ? patch(prevState) : patch;
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};
