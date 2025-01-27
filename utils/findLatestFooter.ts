import type {
  ElementType,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';

import { getComponent } from './reactChildren';

export function findLatestFooter<
  PageProps extends PropsWithChildren,
  FooterProps,
>(
  children: ReactNode[],
  pageComponent: ElementType<PageProps>,
  footerComponent: ElementType<FooterProps>,
  index: number,
):
  | {
      component: ReactElement<FooterProps>;
      childIndex: number;
    }
  | undefined {
  const page = getComponent(children[index], pageComponent);
  const component = getComponent(page?.props?.children, footerComponent);

  if (component) {
    return { component, childIndex: index };
  } else if (index === 0) {
    return undefined;
  }

  return findLatestFooter(children, pageComponent, footerComponent, index - 1);
}
