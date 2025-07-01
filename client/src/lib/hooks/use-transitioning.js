import { useCallback, useLayoutEffect } from 'react';

export default (ref, className, dependencies) => {
  const handleTransitionEnd = useCallback((event) => {
    if (event.target === ref.current) {
      ref.current.classList.remove(className);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    ref.current.classList.add(className);
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return handleTransitionEnd;
};
