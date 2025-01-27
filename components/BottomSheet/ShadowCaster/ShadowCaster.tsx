import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Stack } from '@tamagui/core';

import type { ShadowCasterProps, ShadowCasterRef } from './types';

const ShadowCaster = forwardRef<ShadowCasterRef, ShadowCasterProps>(
  ({ bottom }, ref) => {
    const stackRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => ({
      setOpacity: (value: number) => {
        requestAnimationFrame(() => {
          if (stackRef.current) {
            stackRef.current.style.opacity = value.toString();
          }
        });
      },
    }));

    return (
      <Stack
        ref={stackRef}
        height={20}
        position="absolute"
        width="100%"
        elevationAndroid={3}
        shadowColor="$neutral.noChangeBlack"
        shadowOpacity={0.2}
        pointerEvents="none"
        shadowRadius={8}
        backgroundColor="$surface.container"
        opacity={0} // initial opacity
        style={{ transition: 'opacity 0.1s ease-in-out' }}
        {...(bottom ? { bottom: -20 } : { top: -20 })}
      />
    );
  },
);

export { ShadowCaster };
