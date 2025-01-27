import { useRef } from 'react';

import { SharedValueWeb } from './SharedValueWeb';

/**
 * We dont have react native reanimated as a dependency on web
 * So we use the observable pattern to create some sort of a polyfill
 * This hook will use an observable value on web, and a Shared Value on React Native.
 */
export const useSharedValue = (initial: number) => {
  const ref = useRef<SharedValueWeb<number> | null>(null);

  if (ref.current === null) {
    ref.current = new SharedValueWeb<number>(initial);
  }

  return ref.current;
};
