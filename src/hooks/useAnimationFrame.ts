import { useEffect, useRef } from "react";

export const useAnimationFrame = (callback: (time: number) => void, active: boolean) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!active) return;
    let frame: number;
    const loop = (time: number) => {
      callbackRef.current(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frame);
  }, [active]);
};



