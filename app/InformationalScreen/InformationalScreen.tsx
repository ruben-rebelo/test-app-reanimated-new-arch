import React from 'react';
import { withStaticProperties } from '@tamagui/core';

import {
  InformationalScreenComposerContent,
  type InformationalScreenContentProps,
} from './InformationalScreenComposerContent';
import {
  InformationalScreenComposerFooter,
  type InformationalScreenFooterProps,
} from './InformationalScreenComposerFooter';
import {
  InformationalScreenComposerPage,
  type InformationalScreenPageProps,
} from './InformationalScreenComposerPage';
import {
  InformationalScreenInternal,
  type InformationalScreenProps,
} from '../../components/InformationalScreenInternal';

function _InformationalScreen(props: InformationalScreenProps) {
  return (
    <InformationalScreenInternal
      {...props}
      pageType={InformationalScreenComposerPage}
      contentType={InformationalScreenComposerContent}
      footerType={InformationalScreenComposerFooter}
    />
  );
}

_InformationalScreen.displayName = 'InformationalScreen';

const InformationalScreen = withStaticProperties(_InformationalScreen, {
  Page: InformationalScreenComposerPage,
  Content: InformationalScreenComposerContent,
  Footer: InformationalScreenComposerFooter,
});

export { InformationalScreen };
export type {
  InformationalScreenContentProps,
  InformationalScreenFooterProps,
  InformationalScreenPageProps,
  InformationalScreenProps,
};
