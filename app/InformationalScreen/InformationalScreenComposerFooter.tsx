import React from 'react';
import {type PropsWithChildren} from 'react';
import {type ColorTokens, Stack} from '@tamagui/core';

type InformationalScreenComposerFooterProps = PropsWithChildren & {
    backgroundColor?: ColorTokens;
};

// Component composition.
function InformationalScreenComposerFooter({children}: InformationalScreenComposerFooterProps) {
    return (
        <Stack
            gap="$4"
            padding="$4"
        >
            {children}
        </Stack>
    );
}

InformationalScreenComposerFooter.displayName = 'InformationalScreen.Footer';

export type {InformationalScreenComposerFooterProps as InformationalScreenFooterProps};
export {InformationalScreenComposerFooter};
