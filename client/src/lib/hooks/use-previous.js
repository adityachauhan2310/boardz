import { useEffect, useRef } from 'react';

export default (value) => {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return prevValueRef.current;
};
