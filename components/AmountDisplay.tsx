import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

interface AmountDisplayProps {
  cents: number;
  expression?: string | null;
}

export default function AmountDisplay({ cents, expression }: AmountDisplayProps) {
  const formatCurrency = (cents: number): string => {
    const dollars = cents / 100;
    return `$${dollars.toFixed(2)}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>{formatCurrency(cents)}</Text>
      {expression && (
        <Text style={styles.expression}>{expression}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
    paddingHorizontal: 16,
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.12,
  },
  expression: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.08,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 4,
  },
});
