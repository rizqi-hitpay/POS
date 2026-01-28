import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlusIcon from './PlusIcon';
import MinusIcon from './MinusIcon';

interface CalcIconProps {
  size?: number;
  color?: string;
}

export default function CalcIcon({ size = 28, color = '#002771' }: CalcIconProps) {
  return (
    <View style={styles.container}>
      <PlusIcon size={size} color={color} />
      <Text style={[styles.slash, { color, fontSize: size }]}>/</Text>
      <MinusIcon size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  slash: {
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'center',
  },
});
