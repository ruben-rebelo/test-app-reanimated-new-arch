import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Animated, {EntryAnimationsValues, EntryExitAnimationFunction, LayoutAnimation, SharedValue, useSharedValue, withTiming} from 'react-native-reanimated';

const ANIMATION_DURATION = 350;

function createEntering(direction: SharedValue<'right' | 'left' | undefined>): EntryExitAnimationFunction {
    return (values: EntryAnimationsValues): LayoutAnimation => {
        'worklet';
        if (direction.value === undefined) {
            return {
                initialValues: {
                    dummy: 0,
                },
                animations: {
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

const pages = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
];

export default function TextCarousel() {
    const [index, setIndex] = useState(0);
    const previousIndex = useRef(index);
    const slideDirection = useSharedValue<'right' | 'left' | undefined>(undefined);

    const goNext = () => {
        if (index < pages.length - 1) {
            setIndex(index + 1);
        }
    };

    const goBack = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    let direction: 'right' | 'left' | undefined = undefined;

    if (index === previousIndex.current) {
        direction = undefined;
    } else {
        direction = previousIndex.current < index ? 'right' : 'left';
    }

    slideDirection.value = direction;

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16}}>
            <Animated.View
                entering={createEntering(slideDirection)}
                exiting={createExiting(slideDirection)}
                key={index}
                style={{width: '80%', alignItems: 'center', justifyContent: 'center'}}
            >
                <Text style={{fontSize: 18, textAlign: 'center'}}>{pages[index]}</Text>
            </Animated.View>
            <View style={{marginTop: 16, flexDirection: 'row', gap: 16}}>
                {index > 0 && (
                    <TouchableOpacity
                        onPress={goBack}
                        style={{padding: 10, backgroundColor: '#ddd', borderRadius: 5}}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                )}
                {index < pages.length - 1 && (
                    <TouchableOpacity
                        onPress={goNext}
                        style={{padding: 10, backgroundColor: '#ddd', borderRadius: 5}}
                    >
                        <Text>Next</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
