import { useCallback, useRef } from 'react';

export default (initialValue = false) => {
  const isActiveRef = useRef(initialValue);

  const setIsActive = useCallback((isActive) => {
    setTimeout(() => {
      isActiveRef.current = isActive;
    });
  }, []);

  const activate = useCallback(() => {
    setIsActive(true);
  }, [setIsActive]);

  const deactivate = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  return [isActiveRef, activate, deactivate, setIsActive];
};
