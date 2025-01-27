import type { ElementType, ReactElement, ReactNode } from 'react';
import React from 'react';

/**
 * Filters out children that are of a certain type.
 * @param children The children to filter.
 * @param excludedComponent The component to filter out.
 */
export function filterChildren(
  children: ReactNode,
  excludedComponent: ElementType,
) {
  return React.Children.toArray(children).filter((child) => {
    // @ts-expect-error: TypeScript complains about the type of type
    return child?.type !== excludedComponent;
  });
}

/**
 * Gets the first child that is of a certain type.
 * @param children The children to search.
 * @param component The component to search for.
 */
export function getComponent<T>(
  children: ReactNode,
  component: ElementType<T>,
) {
  const child = React.Children.toArray(children).find((child) => {
    // @ts-expect-error: TypeScript complains about the type of type
    return child?.type === component;
  });

  return child as ReactElement<T> | undefined;
}
