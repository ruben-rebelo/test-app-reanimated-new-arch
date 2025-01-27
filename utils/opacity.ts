/**
 * @param color rgba or hex string value.
 * @returns `string` opacity value of the given color.
 * @returns `undefined` if the passed color value is invalid.
 */
export function extractOpacity(color: string): number | undefined {
  const isRgb = color.startsWith('rgba');

  const isHex = color.startsWith('#');

  if (isRgb) {
    // rgba colors are like this: `rgba(0, 0, 0, 0.5)`
    // Return the `0.5` section
    const lastCommaIndex = color.lastIndexOf(',');
    const lastParenthesisIndex = color.lastIndexOf(')');
    const opacity = color.slice(lastCommaIndex + 1, lastParenthesisIndex);
    return parseFloat(opacity);
  }

  if (isHex) {
    // hex colors are like this: `#00000000`
    // If the length of the color is 9, then the last 2 characters are the opacity
    // else the opacity is 1
    const opacity = color.slice(7);

    if (opacity.length === 2) {
      return parseInt(opacity, 16) / 255;
    }

    if (color.length === 7) {
      return 1;
    }
  }

  return undefined;
}
