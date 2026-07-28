import { useState, useEffect, useCallback } from 'react';

interface UseTimerOptions {
  initialSeconds?: number;
  onTick?: (seconds: number) => void;
  onComplete?: () => void;
}

export function useTimer({ initialSeconds = 90, onTick, onComplete }: UseTimerOptions = {}) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds === 0 && isRunning) {
        setIsRunning(false);
        onComplete?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, onTick, onComplete]);

  const start = useCallback(() => {
    if (seconds === 0) setSeconds(initialSeconds);
    setIsRunning(true);
  }, [seconds, initialSeconds]);

  const pause = useCallback(() => setIsRunning(false), []);

  const toggle = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      if (seconds === 0) setSeconds(initialSeconds);
      setIsRunning(true);
    }
  }, [isRunning, seconds, initialSeconds]);

  const reset = useCallback((newSeconds?: number) => {
    setSeconds(newSeconds ?? initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);

  const addTime = useCallback((additionalSeconds: number) => {
    setSeconds((prev) => prev + additionalSeconds);
  }, []);

  return {
    seconds,
    isRunning,
    start,
    pause,
    toggle,
    reset,
    addTime,
    setSeconds,
  };
}
