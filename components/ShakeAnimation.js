import {useEffect, useRef, useMemo} from 'react';
import {Animated, Easing} from 'react-native';

const ShakeAnimation = inEditMode => {
  const animation = useMemo(() => new Animated.Value(0), []);

  const interval = useRef(null);

  useEffect(() => {
    const triggerAnimation = () => {
      animation.setValue(0);
      Animated.timing(animation, {
        duration: 500,
        toValue: 3,
        useNativeDriver: true, // <-- Add this
        ease: Easing.bounce,
      }).start();
    };

    if (inEditMode) {
      triggerAnimation();
      interval.current = setInterval(() => {
        triggerAnimation();
      }, 2000);
    } else {
      clearInterval(interval.current);
    }
  }, [animation, inEditMode]);

  const interpolated = animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -15, 0, 15, 0, -15, 0],
  });
  const style = {
    transform: [{translateX: interpolated}],
  };

  return style;
};

export default ShakeAnimation;
