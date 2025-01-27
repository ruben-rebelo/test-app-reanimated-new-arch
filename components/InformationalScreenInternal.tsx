import React, {
    Children,
    cloneElement,
    type ElementType,
    type ReactElement,
    useEffect,
    useRef,
  } from 'react';
  import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
  } from 'react-native-reanimated';
  import {
    type ColorTokens,
    isWeb,
    useConfiguration,
    useTheme,
    View,
  } from '@tamagui/core';
  import { useDirection } from '@tamagui/use-direction';
  
  import { filterChildren, getComponent } from '../utils/reactChildren';
  
  import { findLatestFooter } from '../utils/findLatestFooter';
  import { Carousel } from './Carousel';
  import type {
    InformationalScreenPageProps,
  } from './InformationalScreenComposerPage';
  import {
    InformationalScreenScrollView,
    type InformationalScreenScrollViewProps,
  } from './InformationalScreenScrollView';
  
  
  type InformationalScreenProps = {
    /**
     * Index of the current page.
     */
    index?: number;
    /**
     * Pages to be rendered within the full screen modal.
     */
    children: ReactElement | ReactElement[];
    /**
     * Sets if the scroll view bounces
     * @default false
     */
    bounces?: boolean;
  };
  
  type InformationalScreenInternalProps = {
    pageType: ElementType<InformationalScreenPageProps>;
    contentType: ElementType<any>;
    ScrollView?: ElementType<InformationalScreenScrollViewProps>;
    footerType: ElementType<any>;
    defaultBackground?: ColorTokens;
    /**
     * Some components such as the BottomSheetTransition aren't displayed fullscreen. In that case, we might ignore the safe area top.
     */
    ignoreSafeAreaTop?: boolean;
  };
  
  const AnimatedStack = Animated.createAnimatedComponent(View);
  
  function InformationalScreenInternal({
    index = 0,
    children,
    bounces = true,
    pageType,
    contentType,
    footerType,
    ScrollView = InformationalScreenScrollView,
    ignoreSafeAreaTop,
    defaultBackground = '$surface.background',
    ...rest
  }: InformationalScreenProps & InformationalScreenInternalProps) {
  
    if (!Array.isArray(children)) {
      children = [children];
    }
  
    const theme = useTheme();
    const {
      animationDriver: { useAnimatedNumber },
    } = useConfiguration();
    const animatedTitleOpacity = useAnimatedNumber(0);
  
    const footer = findLatestFooter(children, pageType, footerType, index);
    const currentPage = getComponent(children[index], pageType);

  
    const content = Children.map(
      getComponent(currentPage?.props?.children, contentType) ??
        filterChildren(currentPage?.props?.children, footerType),
      (child) =>
        cloneElement(child as ReactElement),
    );
  
    const contentIsUndefined = content === undefined;
    useEffect(() => {
      if (contentIsUndefined) {
        console.error(
          'InformationalScreen.Content or ReactNode must be a direct child of InformationalScreen.Page',
        );
      }
    }, [contentIsUndefined]);
  
    const currentBackgroundColorToken: ColorTokens =
      currentPage?.props?.backgroundColor ?? defaultBackground;
    const currentBackgroundColorTokenValue =
      theme[currentBackgroundColorToken]?.val || currentBackgroundColorToken;
  
    const currentBackgroundColor = useSharedValue(
      currentBackgroundColorTokenValue,
    );
  
    useEffect(() => {
      currentBackgroundColor.value = withTiming(
        currentBackgroundColorTokenValue,
        {
          duration: 300,
        },
      );
    }, [currentBackgroundColorTokenValue, currentBackgroundColor]);
  
    const animatedBackgroundColorStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: currentBackgroundColor.value,
      };
    }, [currentBackgroundColor]);
  
    const writingDirection = useDirection();
  
    return (
      <AnimatedStack
        flex={1}
        style={animatedBackgroundColorStyle}
        direction={writingDirection}
        {...rest}
      >
        <Carousel index={index}>
          <ScrollView
            hideBottomShadow={!footer}
            animatedTitleOpacity={animatedTitleOpacity}
            bounces={bounces}
          >
            {content}
          </ScrollView>
        </Carousel>
        {footer ? (
          <Carousel
            index={footer.childIndex}
          >
            {footer.component}
          </Carousel>
        ) : null}
      </AnimatedStack>
    );
  }
  
  export type { InformationalScreenProps };
  export { InformationalScreenInternal };
  