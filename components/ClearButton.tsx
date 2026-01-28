import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { TrashIcon } from './icons';
import { colors } from '../constants/colors';

interface ClearButtonProps {
  onPress: () => void;
  visible: boolean;
}

export default function ClearButton({ onPress, visible }: ClearButtonProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Animate in
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible, scaleAnim, opacityAnim]);

  if (!shouldRender) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <TrashIcon size={24} color={colors.primaryDark} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 200,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
