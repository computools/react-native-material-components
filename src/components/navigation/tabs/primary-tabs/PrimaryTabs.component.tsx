import React, {useCallback, useEffect, useState} from 'react';
import {View, type ViewProps, type DimensionValue, type StyleProp, type ViewStyle, type TextStyle, type LayoutChangeEvent} from 'react-native';
import Animated, {
  withSpring,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
  type SharedValue,
  type WithSpringConfig,
} from 'react-native-reanimated';

import {type Tab} from '../tab.type';
import {styles} from './primary-tabs.styles';
import {useTheme} from '../../../../theme/useTheme.hook';
import {type IconProps} from '../../../icons/icon-props';
import {Tab as TabComponent} from '../ui/tab/Tab.component';
import {type BadgeSize} from '../../../badge/Badge.component';

export interface PrimaryTabsProps<T, Y> extends ViewProps {
  tabs: Tab<T, Y>[];

  activeTab?: T;
  animConfig?: WithSpringConfig;
  scrollAnim?: SharedValue<number>;

  tabIconProps?: Y;
  badgeSize?: BadgeSize;
  tabStyle?: StyleProp<ViewStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
  tabTitleStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabsContainerStyle?: StyleProp<ViewStyle>;
  tabInnerContentStyle?: StyleProp<ViewStyle>;
}

const BASE_INDICATOR_WIDTH = 33;

export const PrimaryTabs = <T extends string, Y extends IconProps>({
  tabs,

  activeTab,
  badgeSize,
  scrollAnim,
  animConfig = {} as WithSpringConfig,

  tabStyle,
  badgeStyle,
  tabIconProps,
  tabTitleStyle,
  indicatorStyle,
  tabsContainerStyle,
  tabInnerContentStyle,
  ...props
}: PrimaryTabsProps<T, Y>) => {
  const [tabTextWidths, setTabTextWidths] = useState<number[]>(tabs.map(() => 0));

  const {primary, outlineVariant} = useTheme();

  const tabWidth: DimensionValue = `${100 / tabs.length}%`;
  const activeTabIndex = tabs.findIndex((tab) => tab.routeName === activeTab);

  const calcStartIndicatorPosition = useCallback((totalTabsCount: number, targetTabIndex: number) => {
    'worklet';

    return (1 / totalTabsCount) * targetTabIndex;
  }, []);

  const indicatorStartPos = useSharedValue(calcStartIndicatorPosition(tabs.length, activeTabIndex));

  useEffect(() => {
    indicatorStartPos.value = withSpring(calcStartIndicatorPosition(tabs.length, activeTabIndex), {
      duration: 300,
      dampingRatio: 1.5,
      overshootClamping: true,
      restSpeedThreshold: 0.0001,
      ...animConfig,
    } as WithSpringConfig);
  }, [activeTabIndex]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    const endPosition = calcStartIndicatorPosition(tabs.length, activeTabIndex);

    const isMovingRight = indicatorStartPos.value <= endPosition;
    const prevTabIndex = isMovingRight ? activeTabIndex - 1 : activeTabIndex + 1;

    const startPosition = calcStartIndicatorPosition(tabs.length, Math.abs(prevTabIndex));

    return {
      width: interpolate(
        indicatorStartPos.value,
        [startPosition, endPosition],
        [tabTextWidths[prevTabIndex] ?? BASE_INDICATOR_WIDTH, tabTextWidths[activeTabIndex] ?? BASE_INDICATOR_WIDTH]
      ),
    };
  }, [activeTabIndex, tabTextWidths]);

  const indicatorContainerAnimatedStyle = useAnimatedStyle(() => {
    const maxPosition = calcStartIndicatorPosition(tabs.length, tabs.length - 1);

    return {
      start: `${interpolate(
        scrollAnim ? scrollAnim.value : indicatorStartPos.value,
        [0, maxPosition],
        [0, maxPosition * 100],
        Extrapolation.CLAMP
      )}%`,
    };
  }, [tabs]);

  const handleTextLayout = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const {width} = event.nativeEvent.layout;

      setTabTextWidths((currWidths) => {
        const updatedWidths = [...currWidths];
        updatedWidths[index] = width;
        return updatedWidths;
      });
    },
    []
  );

  const renderTab = (tab: Tab<T, Y>, index: number) => (
    <TabComponent
      key={tab.routeName}
      onInnerContentLayout={handleTextLayout(index)}
      {...tab}
      active={tab.routeName === activeTab}
      iconProps={tabIconProps}
      badgeSize={badgeSize}
      badgeStyle={badgeStyle}
      titleStyle={tabTitleStyle}
      innerContentStyle={tabInnerContentStyle}
      style={[styles.tab, tab.style, tabStyle]}
    />
  );

  return (
    <View style={[styles.container, {borderBottomColor: outlineVariant}]} {...props}>
      <View style={[styles.tabs, tabsContainerStyle]}>{tabs.map(renderTab)}</View>
      <Animated.View style={[styles.indicatorContainer, {width: tabWidth}, indicatorContainerAnimatedStyle]}>
        <Animated.View
          style={[
            styles.indicator,
            {backgroundColor: primary.background, width: tabTextWidths[activeTabIndex]},
            indicatorStyle,
            indicatorAnimatedStyle,
          ]}
        />
      </Animated.View>
    </View>
  );
};
