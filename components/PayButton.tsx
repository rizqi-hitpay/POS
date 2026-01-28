import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

interface PayButtonProps {
  onPress: () => void;
  disabled?: boolean;
  amount?: number; // Amount in cents
}

function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function PayButton({ onPress, disabled, amount }: PayButtonProps) {
  const buttonText = amount && amount > 0 ? `Pay for ${formatAmount(amount)}` : 'Pay';

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{buttonText}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    borderRadius: 200,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 142,
  },
  buttonDisabled: {
    backgroundColor: colors.payButtonDisabled,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  textDisabled: {
    color: colors.payButtonTextDisabled,
  },
});
