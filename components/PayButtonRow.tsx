import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { TrashIcon } from './icons';
import { colors } from '../constants/colors';

interface PayButtonRowProps {
  amount: number;
  disabled: boolean;
  onPay: () => void;
  onClear: () => void;
}

const ANIMATION_DURATION = 300;
const CLEAR_BUTTON_SIZE = 48;
const GAP = 8;

function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function PayButtonRow({ amount, disabled, onPay, onClear }: PayButtonRowProps) {
  const showClear = amount > 0;
  const animatedValue = useRef(new Animated.Value(showClear ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: showClear ? 1 : 0,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // We need to animate layout properties
    }).start();
  }, [showClear, animatedValue]);

  const buttonText = amount > 0 ? `Pay for ${formatAmount(amount)}` : 'Pay';

  // Animate clear button
  const clearButtonScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const clearButtonOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });

  const clearButtonWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, CLEAR_BUTTON_SIZE],
  });

  const clearButtonMargin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, GAP],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.clearButtonContainer,
          {
            width: clearButtonWidth,
            marginRight: clearButtonMargin,
            opacity: clearButtonOpacity,
            transform: [{ scale: clearButtonScale }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
          activeOpacity={0.7}
        >
          <TrashIcon size={24} color={colors.primaryDark} />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[styles.payButton, disabled && styles.payButtonDisabled]}
        onPress={onPay}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text style={[styles.payText, disabled && styles.payTextDisabled]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  clearButtonContainer: {
    height: CLEAR_BUTTON_SIZE,
    overflow: 'hidden',
  },
  clearButton: {
    width: CLEAR_BUTTON_SIZE,
    height: CLEAR_BUTTON_SIZE,
    borderRadius: 200,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButton: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    borderRadius: 200,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 142,
  },
  payButtonDisabled: {
    backgroundColor: colors.payButtonDisabled,
  },
  payText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  payTextDisabled: {
    color: colors.payButtonTextDisabled,
  },
});
