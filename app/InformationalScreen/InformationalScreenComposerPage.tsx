import {type PropsWithChildren} from 'react';
import type {ColorTokens} from '@tamagui/core';

import type {InformationalScreenScrollViewProps} from '../../components/InformationalScreenScrollView';

type InformationalScreenTopNavigationProps =
    | {
          animatedTitle?: never;
      }
    | {
          animatedTitle: true;
          /**
           * The description that appears under animated title
           */
          description?: string;
          /**
           * The type token for the description  that appears under animated title
           * @default "$bodyBase.default"
           */
          descriptionTextType?: InformationalScreenScrollViewProps['descriptionTextType'];
      };

type InformationalScreenComposerPageProps = PropsWithChildren<{
    /**
     * Top navigation props for the informational screen. You cannot provide this if the parent has topNavigationProps.
     */
    topNavigationProps?: InformationalScreenTopNavigationProps | null;
    backgroundColor?: ColorTokens;
    testID?: string;
}>;

// Component composition.
function InformationalScreenComposerPage({children}: InformationalScreenComposerPageProps) {
    return children;
}

InformationalScreenComposerPage.displayName = 'InformationalScreen.Page';

export type {InformationalScreenComposerPageProps as InformationalScreenPageProps, InformationalScreenTopNavigationProps};
export {InformationalScreenComposerPage};
