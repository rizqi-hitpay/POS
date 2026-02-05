import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import {
  PaymentIconType,
  getPaymentIcon,
} from './icons/PaymentIcons';

interface PaymentMethodItemProps {
  icon: PaymentIconType;
  title: string;
  description?: string;
  connected?: boolean;
  selected?: boolean;
  onPress?: () => void;
}

export default function PaymentMethodItem({
  icon,
  title,
  connected,
  selected,
  onPress,
}: PaymentMethodItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {getPaymentIcon(icon, { size: 20, color: colors.textPrimary })}
      </View>
      <Text style={styles.title}>{title}</Text>
      {connected && (
        <View style={styles.connectedBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    gap: 12,
  },
  containerSelected: {
    borderColor: colors.primaryBlue,
    shadowColor: 'rgba(12, 8, 56, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.grey50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  connectedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4C689C',
  },
});
