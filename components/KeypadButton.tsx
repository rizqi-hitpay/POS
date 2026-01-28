import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, ViewStyle, Platform } from 'react-native';
import { colors } from '../constants/colors';
import { CalcIcon } from './icons';

interface KeypadButtonProps {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;
  variant?: 'default' | 'action';
  style?: ViewStyle;
}

export default function KeypadButton({
  label,
  onPress,
  onLongPress,
  variant = 'default',
  style,
}: KeypadButtonProps) {
  const isCalc = label === '+';
  const isBackspace = label === '⌫';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={300}
    >
      {({ pressed }) => (
        <View style={[styles.innerButton, pressed && styles.innerButtonPressed]}>
          {isCalc ? (
            <CalcIcon size={28} color={colors.primaryDark} />
          ) : (
            <Text style={[
              styles.text,
              isBackspace && styles.actionText
            ]}>
              {label}
            </Text>
          )}
          {pressed && <View style={styles.innerShadow} pointerEvents="none" />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: colors.keypadGradientEnd,
    shadowColor: 'rgba(14, 14, 57, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    elevation: 2,
  },
  buttonPressed: {
    shadowColor: 'rgba(10, 10, 36, 1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  innerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.keypadGradientStart,
    overflow: 'hidden',
  },
  innerButtonPressed: {
    backgroundColor: colors.keypadGradientEnd,
  },
  innerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(36, 36, 119, 0.12)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  text: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.primaryDark,
    lineHeight: 36,
  },
  actionText: {
    fontSize: 24,
    color: colors.primaryDark,
  },
});
