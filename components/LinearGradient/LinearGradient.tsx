import React, { useId, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import {
  Defs,
  LinearGradient as SVGLinearGradient,
  Rect,
  Stop,
  Svg,
} from 'react-native-svg';
import { type ColorTokens, useTheme, Stack, type StackProps } from '@tamagui/core';

import { extractOpacity } from '../../utils/opacity';

type Position = { x: number; y: number };

type AnyString = string & { _any?: unknown };

type LinearGradientProps = Omit<StackProps, 'start' | 'end'> & {
  /**
   * An array of colors that represent stops in the gradient.
   */
  colors: Array<ColorTokens | AnyString>;
  /**
   * The locations of colors between [0, 1] (inclusive) to specify the gradient stops. If undefined, evenly spaced colors are used. If locations are provided, the colors array must be the same length as the locations array
   * @default undefined (evenly spaced colors are used)
   */
  locations?: [number];
  /**
   * The start point of the gradient. Takes an object with x and y values between [0, 1] (inclusive).
   * @default {x: 0, y: 0} (Top Left)
   */
  start?: Position;
  /**
   * The end point of the gradient. Takes an object with x and y values between [0, 1] (inclusive).
   * @default {x: 1, y: 0} (Top Right)
   */
  end?: Position;
  children?: React.ReactNode;
};

function LinearGradient({
  colors: colorsProp,
  locations,
  start,
  end,
  children,
  ...rest
}: LinearGradientProps) {
  if (process.env.NODE_ENV === 'development') {
    if (locations !== undefined && locations.length !== colorsProp.length) {
      console.warn(
        `LinearGradient: locations array should be the same length as colors array. Locations array length: ${locations.length}, Colors array length: ${colorsProp.length}`,
      );
    }

    if (colorsProp.length < 2) {
      console.error(
        `LinearGradient: colors prop must be an array of at least 2 colors.`,
      );
    }
  }

  const gradientId = useId();
  const theme = useTheme();

  const colorsWithOpacity = useMemo<Array<{ color: string; opacity: number }>>(
    () =>
      colorsProp?.map((colorToken) => {
        const resolvedColor: string =
          theme[colorToken]?.get('web') ?? colorToken;
        const opacity = extractOpacity(resolvedColor);

        if (opacity === undefined) {
          console.warn(
            `LinearGradient: Color token ${colorToken} with resolved value ${resolvedColor} doesn't have a valid opacity value. Defaulting to 1.`,
          );
        }

        return {
          color: resolvedColor,
          opacity: opacity ?? 1,
        };
      }),
    [colorsProp, theme],
  );

  return (
    <Stack {...rest}>
      <Stack style={absoluteFillStyle}>
        <Svg width="100%" height="100%">
          <Defs>
            <SVGLinearGradient
              id={`linearGradient-${gradientId}`}
              x1={start?.x}
              y1={start?.y}
              x2={end?.x}
              y2={end?.y}
            >
              {colorsWithOpacity.map(({ color, opacity }, index) => (
                <Stop
                  key={index}
                  stopColor={color}
                  stopOpacity={opacity}
                  offset={
                    locations
                      ? locations[index]
                      : index / (colorsWithOpacity.length - 1)
                  }
                />
              ))}
            </SVGLinearGradient>
          </Defs>
          <Rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#linearGradient-${gradientId})`}
          />
        </Svg>
      </Stack>
      {children}
    </Stack>
  );
}

const absoluteFillStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export { LinearGradient };
export type { LinearGradientProps };
