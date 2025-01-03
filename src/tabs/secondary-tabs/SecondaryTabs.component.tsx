import React, {useCallback, useEffect} from 'react';
import {View, type ViewProps, type StyleProp, type ViewStyle, type TextStyle} from 'react-native';
import Animated, {useSharedValue, type WithSpringConfig, Extrapolation, withSpring, useAnimatedStyle, interpolate} from 'react-native-reanimated';

import {type Tab} from '../tab.type';
import {styles} from './secondary-tabs.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {Tab as TabComponent, TabType} from '../ui/tab/Tab.component';

export interface SecondaryTabsProps<T, Y> extends ViewProps {
  tabs: Tab<T, Y>[];
  activeTab: T;

  animConfig?: WithSpringConfig;

  tabIconProps?: Y;
  tabStyle?: StyleProp<ViewStyle>;
  tabTitleStyle?: StyleProp<TextStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  tabsContainerStyle?: StyleProp<ViewStyle>;
  tabInnerContentStyle?: StyleProp<ViewStyle>;

  onTabPress: (tabName: T) => void;
}

export const SecondaryTabs = <T extends string, Y extends IconProps>({
  tabs,
  activeTab,

  animConfig = {} as WithSpringConfig,

  tabStyle,
  tabIconProps,
  tabTitleStyle,
  indicatorStyle,
  tabsContainerStyle,
  tabInnerContentStyle,

  onTabPress,

  ...props
}: SecondaryTabsProps<T, Y>) => {
  const {primary, outlineVariant} = useTheme();
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
    const maxPosition = calcStartIndicatorPosition(tabs.length, tabs.length - 1);

    return {start: `${interpolate(indicatorStartPos.value, [0, maxPosition], [0, maxPosition * 100], Extrapolation.CLAMP)}%`};
  }, [tabs]);

  const renderSecondaryTab = (tab: Tab<T, Y>) => (
    <TabComponent
      key={tab.routeName}
      {...tab}
      onPress={onTabPress}
      type={TabType.SECONDARY}
      active={tab.routeName === activeTab}
      iconProps={tabIconProps}
      titleStyle={tabTitleStyle}
      style={[styles.tab, tab.style, tabStyle]}
      innerContentStyle={tabInnerContentStyle}
    />
  );

  return (
    <View style={[styles.container, {borderBottomColor: outlineVariant}]} {...props}>
      <View style={[styles.tabs, tabsContainerStyle]}>{tabs.map(renderSecondaryTab)}</View>
      <Animated.View
        style={[styles.indicator, {backgroundColor: primary.background, width: `${100 / tabs.length}%`}, indicatorStyle, indicatorAnimatedStyle]}
      />
    </View>
  );
};
