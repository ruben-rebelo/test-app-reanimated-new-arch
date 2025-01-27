import React from 'react';
import { type PropsWithChildren } from 'react';
import { Stack } from '@tamagui/core';

type InformationalScreenComposerContentProps = PropsWithChildren;

// Component composition.
function InformationalScreenComposerContent({
  children,
}: InformationalScreenComposerContentProps) {
  return (
    <Stack padding="$4" gap="$4">
      {children}
    </Stack>
  );
}

InformationalScreenComposerContent.displayName = 'InformationalScreen.Content';

export type { InformationalScreenComposerContentProps as InformationalScreenContentProps };
export { InformationalScreenComposerContent };
