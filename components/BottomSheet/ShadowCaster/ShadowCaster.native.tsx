import React, { forwardRef, useImperativeHandle } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { isAndroid, Stack } from '@tamagui/core';

import { LinearGradient } from '../../LinearGradient';

import type { ShadowCasterProps, ShadowCasterRef } from './types';

const ShadowCasterInternal = forwardRef<ShadowCasterRef, ShadowCasterProps>(
  ({ bottom }, ref) => {
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(
      () => ({
        opacity: opacity.value,
      }),
      [opacity],
    );

    useImperativeHandle(ref, () => ({
      setOpacity: (value: number) => {
        opacity.value = value;
      },
    }));

    return (
      <Animated.View
        style={[
          {
            height: 20,
            position: 'absolute',
            width: '100%',
            overflow: 'hidden',
          },
          bottom ? { bottom: 0 } : { top: 0 },
          animatedStyle,
        ]}
        pointerEvents="none"
      >
        {isAndroid ? (
          // Android doesn't support box shadows, we use a gradient for a similar effect
          <LinearGradient
            opacity={0.1}
            start={{ x: 0, y: bottom ? 1 : 0 }}
            end={{ x: 0, y: 0.5 }}
            colors={['#000000', '#0E0D0D00']}
            height={20}
          />
        ) : (
          <Stack
            height={20}
            width="100%"
            shadowColor="$neutral.noChangeBlack"
            shadowOpacity={0.2}
            shadowRadius={8}
            top={bottom ? undefined : -20}
            bottom={bottom ? -20 : undefined}
            backgroundColor="$surface.container"
          />
        )}
      </Animated.View>
    );
  },
);

const ShadowCaster = React.memo(ShadowCasterInternal);

export { ShadowCaster };
