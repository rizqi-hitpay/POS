import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import {
  PaymentIconType,
  getPaymentIcon,
  getIconBackgroundColor,
  CheckmarkIcon,
} from './icons/PaymentIcons';

interface PaymentMethodItemProps {
  icon: PaymentIconType;
  title: string;
  description: string;
  connected?: boolean;
  selected?: boolean;
  onPress?: () => void;
}

export default function PaymentMethodItem({
  icon,
  title,
  description,
  connected,
  selected,
  onPress,
}: PaymentMethodItemProps) {
  const backgroundColor = getIconBackgroundColor(icon);

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.mainRow}>
        <View style={[styles.iconContainer, { backgroundColor }]}>
          {getPaymentIcon(icon, { size: 24, color: '#FFFFFF' })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      {connected && (
        <View style={styles.connectedRow}>
          <CheckmarkIcon size={12} color="#22C55E" />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    gap: 8,
  },
  containerSelected: {
    borderColor: colors.primaryBlue,
    shadowColor: 'rgba(12, 8, 56, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textTertiary,
    lineHeight: 16,
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  connectedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4C689C',
  },
});
