import React, {useCallback, useEffect} from 'react';
import {View, type ViewProps, type StyleProp, type ViewStyle} from 'react-native';
import Animated, {useSharedValue, withTiming, useAnimatedStyle, interpolate} from 'react-native-reanimated';

import {type Tab} from '../tab.type';
import {styles} from './secondary-tabs.styles';
import {useTheme} from '../../theme/useTheme.hook';
import {type IconProps} from '../../icons/icon-props';
import {SecondaryTab} from './secondary-tab/SecondaryTab.component';

export interface SecondaryTabsProps<T, Y> extends ViewProps {
  tabs: Tab<T, Y>[];
  activeTab: T;

  indicatorStyle?: StyleProp<ViewStyle>;

  onTabPress: (tabName: T) => void;
}

export const SecondaryTabs = <T extends string, Y extends IconProps>({
  tabs,
  activeTab,
  indicatorStyle,
  onTabPress,
  ...props
}: SecondaryTabsProps<T, Y>) => {
  const {primary, outline} = useTheme();
  const activeTabIndex = tabs.findIndex((tab) => tab.routeName === activeTab);

  const calcStartIndicatorPosition = useCallback((totalTabsCount: number, targetTabIndex: number) => {
    'worklet';

    return (1 / totalTabsCount) * targetTabIndex;
  }, []);

  const indicatorStartPos = useSharedValue(calcStartIndicatorPosition(tabs.length, activeTabIndex));

  useEffect(() => {
    indicatorStartPos.value = withTiming(calcStartIndicatorPosition(tabs.length, activeTabIndex));
  }, [activeTabIndex]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    const maxPosition = calcStartIndicatorPosition(tabs.length, tabs.length - 1);

    return {start: `${interpolate(indicatorStartPos.value, [0, maxPosition], [0, maxPosition * 100])}%`};
  });

  const renderSecondaryTab = (tab: Tab<T, Y>) => (
    <SecondaryTab key={tab.routeName} {...tab} onPress={onTabPress} active={tab.routeName === activeTab} style={[styles.tab, tab.style]} />
  );

  return (
    <View style={[styles.container, {borderBottomColor: outline}]} {...props}>
      <View style={styles.tabs}>{tabs.map(renderSecondaryTab)}</View>
      <Animated.View
        style={[styles.indicator, {backgroundColor: primary.background, width: `${100 / tabs.length}%`}, indicatorStyle, indicatorAnimatedStyle]}
      />
    </View>
  );
};
