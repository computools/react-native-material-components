import React, {useCallback} from 'react';
import Svg, {type SvgProps, Path} from 'react-native-svg';
import Animated, {interpolate, useAnimatedProps, useSharedValue, withTiming} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const AnimatedSelectedIcon: React.FC<SvgProps> = (props) => {
  const pathRef = React.useRef<Path>(null);
  const progress = useSharedValue(0);
  const [length, setLength] = React.useState(0);

  const onLayout = useCallback(() => setLength(pathRef.current?.getTotalLength() ?? 0), [pathRef.current]);

  React.useEffect(() => {
    progress.value = withTiming(1, {duration: 330});
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(progress.value, [0, 1], [length, 0]),
  }));

  return (
    <Svg width={props.width} height={props.height} viewBox="0 0 21 24" fill="none" {...props}>
      <AnimatedPath
        ref={pathRef}
        onLayout={onLayout}
        stroke={props.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={props.strokeWidth}
        d="M4 12.611 8.923 17.5 20 6.5"
        animatedProps={animatedProps}
        strokeDasharray={length}
      />
    </Svg>
  );
};
