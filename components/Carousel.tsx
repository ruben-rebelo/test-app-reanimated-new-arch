import React, {memo, useMemo, useRef} from 'react';
import Animated, {
    type EntryAnimationsValues,
    type EntryExitAnimationFunction,
    type LayoutAnimation,
    LayoutAnimationConfig,
    type SharedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {useDirection} from '@tamagui/use-direction';
import {View} from '@tamagui/core';

export type CarouselProps = {
    /**
     * The index of the current slide.
     */
    index: number;
    /**
     * Sometimes, we want the carousel to change the children but not play the animation.
     * In that case, we can keep this prop same, and the animation won't be triggered.
     * Leave it undefined if you want the animation to be triggered.
     */
    overrideKey?: string | null;

    children: any;
};

const ANIMATION_DURATION = 350; // milliseconds

function createEntering(direction: SharedValue<'right' | 'left' | undefined>): EntryExitAnimationFunction {
    return (values: EntryAnimationsValues): LayoutAnimation => {
        'worklet';
        if (direction.value === undefined) {
            return {
                initialValues: {
                    dummy: 0,
                },
                animations: {
                    // NOTE: There is a bug in reanimated where if there is no animation,
                    // the carousel component leaves a blank view when unmounted.
                    dummy: withTiming(1, {duration: 1}),
                },
            };
        }

        return {
            initialValues: {
                originX: direction.value === 'right' ? values.windowWidth : -values.windowWidth,
            },

            animations: {
                originX: withTiming(0, {duration: ANIMATION_DURATION}),
            },
        };
    };
}

function createExiting(direction: SharedValue<'right' | 'left' | undefined>): EntryExitAnimationFunction {
    return (values: EntryAnimationsValues): LayoutAnimation => {
        'worklet';
        if (direction.value === undefined) {
            return {
                initialValues: {
                    dummy: 0,
                },
                animations: {
                    // NOTE: There is a bug in reanimated where if there is no animation,
                    // the carousel component leaves a blank view when unmounted.
                    dummy: withTiming(1, {duration: 1}),
                },
            };
        }

        return {
            initialValues: {
                originX: 0,
            },

            animations: {
                originX: withTiming(direction.value === 'right' ? -values.windowWidth : values.windowWidth, {duration: ANIMATION_DURATION}),
            },
        };
    };
}

const AnimatedView = Animated.createAnimatedComponent(View);

function _Carousel({index, children, overrideKey, ...rest}: CarouselProps) {
    const writingDirection = useDirection();
    const isRtl = writingDirection === 'rtl';
    const previousIndex = useRef(index);
    const slideDirection = useSharedValue<'right' | 'left' | undefined>(undefined);

    const isReduceMotionEnabled = false;

    const [entering, exiting] = useMemo(() => {
        if (isReduceMotionEnabled) {
            return [undefined, undefined];
        }

        return [createEntering(slideDirection), createExiting(slideDirection)];
        // The dependencies are animated values, which are updated nevertheless
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReduceMotionEnabled]);

    let direction: 'right' | 'left' | undefined = undefined;

    if (index === previousIndex.current) {
        direction = undefined;
    } else {
        direction = previousIndex.current < index ? (isRtl ? 'left' : 'right') : isRtl ? 'right' : 'left';
    }

    slideDirection.value = direction;

    // It's important to update the previous index after the slideDirection
    previousIndex.current = index;

    return (
        <LayoutAnimationConfig
            skipExiting // When the component unmounts, we don't want to run the exiting animation.
        >
            {/* The way this works is, we change the key anytime the index changes, so the layout animation is triggered.
          The entering and exiting animations are set based on the next direction of the animation.
          Exiting animation animates the old element, and entering animation animates the new one.
          The direction is calculated based on the previous index and the new index. */}
            <AnimatedView
                key={overrideKey ?? index}
                entering={entering}
                exiting={exiting}
                {...rest}
            >
                {children}
            </AnimatedView>
        </LayoutAnimationConfig>
    );
}

// We don't want to trigger re-renders if anything other than children changes.
// The reason is, sometimes both the children and the index change, rendering the component twice in a row.
// When the component is rendered twice in a row, the previousIndex stays the same in the second render, therefore
// the slideDirection becomes "left" and the animation is played in the wrong direction.
const Carousel = memo(_Carousel, (prev, next) => {
    return prev.children === next.children;
});

export {Carousel};
