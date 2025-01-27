import React, {Children, type ReactElement} from 'react';
import {cloneElement} from 'react';
import type {StackProps} from '@tamagui/core';
import {getTokenValue, Stack, styled} from '@tamagui/core';
import {useDirection} from '@tamagui/use-direction';

import {Text} from '@tamagui/core';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'regular' | 'small';

const defaultButtonVariant = 'primary';

function hasCustomPadding(props: Partial<any>) {
    return Object.keys(props).some((key) => key.startsWith('padding'));
}

const ButtonFrame = styled(Stack, {
    name: 'Button',
    tag: 'button',
    flexDirection: 'row',
    focusable: true,
    cursor: 'pointer',

    accessible: true,
    role: 'button',

    borderWidth: 1,
    gap: '$2',

    outlineWidth: 2,
    outlineOffset: 2,

    variants: {
        disabled: {
            true: {
                'aria-disabled': true,
                focusable: false,
                needsOffscreenAlphaCompositing: true,
                cursor: 'not-allowed',
            },
            false: {
                'aria-disabled': false,
                focusStyle: {
                    outlineStyle: 'solid',
                },
            },
        },
        size: {
            regular: {
                minHeight: 48,
                paddingVertical: 11, // [Collapse Border $3]
                paddingHorizontal: 15, // [Collapse Border $4]
            },
            small: {
                minHeight: 32,
                hitSlop: {top: 6, bottom: 6},
                paddingVertical: 3, // [Collapse Border $1]
                paddingHorizontal: 11, // [Collapse Border $3]
            },
        },
    } as const,
});

function getButtonIcon(children: ReactElement<any>, size: ButtonSize) {
    const child = Children.only(children);
    const childProps = child.props;
    const {color, accentColor} = childProps;

    const props = {
        ...childProps,
        color: color,
        accentColor: accentColor,
        size: size === 'small' ? ('small' as const) : ('default' as const),
    };

    return cloneElement(child, props);
}

function Button({label, iconStart, iconEnd, disabled = false, variant = defaultButtonVariant, size = 'regular', testID, singleLine = false, alignStart, onPress, ...props}: any) {
    const writingDirection = useDirection();

    return (
        <ButtonFrame
            {...props}
            onPress={disabled ? undefined : onPress}
            disabled={disabled}
            direction={writingDirection}
            testID={testID}
            flexShrink={1}
            size={size}
            hasCustomPadding={hasCustomPadding(props)}
        >
            <Stack><Text>{label}</Text></Stack>
            {iconEnd ? getButtonIcon(iconEnd, size) : null}
        </ButtonFrame>
    );
}

export {Button};
