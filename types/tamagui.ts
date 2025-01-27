import type { FontSizeTokens, ColorTokens } from '@tamagui/core';

type FontToken = Exclude<FontSizeTokens, number>;

export type { ColorTokens as ColorToken, FontToken };
