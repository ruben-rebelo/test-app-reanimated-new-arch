import React, {type PropsWithChildren, useRef} from 'react';
import {ScrollView, type ScrollViewProps, StyleSheet} from 'react-native';
import {styled, type UniversalAnimatedNumber} from '@tamagui/core';

import {useSharedValue} from '../utils/useSharedValue';
import {interpolateLinear} from '../utils/interpolate';
import {Stack, type StackProps, Text} from '@tamagui/core';
import {ShadowCaster, type ShadowCasterRef} from './BottomSheet/ShadowCaster';

export const AnimatedTitle = styled(Text);

// A bigger value will make the shadow appear sooner.
const SHADOW_SCROLL_THRESHOLD = 32;

// This value is used to fix the shadow appearing when the content is zoomed in.
const SHADOW_ZOOM_THRESHOLD = 1;

// Component composition.
type InformationalScreenScrollViewProps = ScrollViewProps & {
    /*
     * Force hide top shadow, even if content exceeds whole screen.
     */
    hideTopShadow?: boolean;
    /*
     * Force hide bottom shadow, even if content exceeds whole screen.
     */
    hideBottomShadow?: boolean;
    /*
     * Animated title opacity.
     */
    animatedTitleOpacity: UniversalAnimatedNumber<unknown>;
    /**
     * The animated title is displayed inside the scroll view.
     */
    animatedTitle?: string;
    /**
     * The description that appears under animated title
     */
    description?: string;
    /**
     * These are passed to the container that's inside the scroll view
     */
    contentProps?: StackProps;
    testID?: string;
    descriptionTextType?: any
};

function InformationalScreenScrollView({
    children,
    hideTopShadow = false,
    hideBottomShadow = false,
    animatedTitleOpacity,
    animatedTitle,
    description,
    contentProps,
    testID,
    ...rest
}: PropsWithChildren<InformationalScreenScrollViewProps>) {
    const animatedTitleHeight = useSharedValue(0);

    const contentSizeRef = useRef(0);
    const containerSizeRef = useRef(0);

    const topShadowRef = useRef<ShadowCasterRef>(null);
    const bottomShadowRef = useRef<ShadowCasterRef>(null);

    // onScroll isn't triggered on initial render, so we need to call this function
    // to set the initial shadow opacity.
    function onLayout({containerSize, contentSize}: {containerSize: number; contentSize: number}) {
        containerSizeRef.current = containerSize;
        contentSizeRef.current = contentSize;
        const isScrollable = contentSize > containerSize + SHADOW_ZOOM_THRESHOLD;

        if (contentSize <= 0 || containerSize <= 0) {
            topShadowRef.current?.setOpacity(0);
            bottomShadowRef.current?.setOpacity(0);
            return;
        }

        if (isScrollable) {
            topShadowRef.current?.setOpacity(0);
            bottomShadowRef.current?.setOpacity(1);
            return;
        }

        topShadowRef.current?.setOpacity(0);
        bottomShadowRef.current?.setOpacity(0);
    }

    return (
        <Stack flex={1}>
            <ScrollView
                {...rest}
                alwaysBounceVertical={false}
                contentContainerStyle={styles.contentContainerStyle}
                style={styles.scrollView}
                scrollEventThrottle={1}
                onScroll={({nativeEvent}) => {
                    const scrollY = nativeEvent.contentOffset.y;
                    const contentSize = nativeEvent.contentSize.height;
                    const containerSize = nativeEvent.layoutMeasurement.height;
                    const isScrollable = contentSize > containerSize + SHADOW_ZOOM_THRESHOLD;

                    animatedTitleOpacity.setValue(scrollY > animatedTitleHeight.value ? 1 : 0, {
                        type: 'timing',
                        duration: 150,
                    });

                    if (!isScrollable) {
                        topShadowRef.current?.setOpacity(0);
                        bottomShadowRef.current?.setOpacity(0);
                        return;
                    }

                    const topShadowValue = Math.min(scrollY / SHADOW_SCROLL_THRESHOLD, 1);
                    topShadowRef.current?.setOpacity(topShadowValue);

                    const distanceToBottom = contentSize - scrollY - containerSize;
                    const bottomShadowValue = interpolateLinear(distanceToBottom, [0, SHADOW_SCROLL_THRESHOLD], [0, 1]);
                    bottomShadowRef.current?.setOpacity(bottomShadowValue);
                }}
                onLayout={({nativeEvent}) => {
                    onLayout({
                        containerSize: nativeEvent.layout.height,
                        contentSize: contentSizeRef.current,
                    });
                }}
            >
                <Stack
                    {...contentProps}
                    onLayout={(event) => {
                        onLayout({
                            containerSize: containerSizeRef.current,
                            contentSize: event.nativeEvent.layout.height,
                        });
                    }}
                    flexGrow={1}
                >
                    {animatedTitle ? (
                        <>
                            <AnimatedTitle
                                marginHorizontal="$4"
                                onLayout={({nativeEvent}) => {
                                    animatedTitleHeight.value = nativeEvent.layout.height;
                                }}
                            >
                                {animatedTitle}
                            </AnimatedTitle>
                            {description ? (
                                <Text
                                    marginTop="$2"
                                    marginHorizontal="$4"
                                >
                                    {description}
                                </Text>
                            ) : null}
                        </>
                    ) : null}
                    {children}
                </Stack>
            </ScrollView>
            {!hideTopShadow ? <ShadowCaster ref={topShadowRef} /> : undefined}
            {!hideBottomShadow ? (
                <ShadowCaster
                    ref={bottomShadowRef}
                    bottom
                />
            ) : undefined}
        </Stack>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },

    contentContainerStyle: {
        flexGrow: 1,
    },
});

export {InformationalScreenScrollView};
export type {InformationalScreenScrollViewProps};
