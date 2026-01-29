import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { PaymentMethod } from './PaymentMethodSheet';
import { Customer } from './CustomerSheet';
import { getPaymentIcon } from './icons/PaymentIcons';
import { UserIcon } from './icons/CustomerIcons';

interface ActionChipsProps {
  onPaymentMethod?: () => void;
  onCustomer?: () => void;
  onMore?: () => void;
  selectedPaymentMethod?: PaymentMethod | null;
  selectedCustomer?: Customer | null;
}

// Helper to get short display title
function getShortTitle(id: string): string {
  const titles: Record<string, string> = {
    'terminal': 'Terminal',
    'tap-to-pay': 'Tap to Pay',
    'scan-to-pay': 'Scan to Pay',
    'card-details': 'Card',
    'payment-link': 'Link',
    'cash': 'Cash',
    'paynow': 'PayNow',
    'wechat': 'WeChat',
  };
  return titles[id] || 'Payment';
}

function PaymentMethodChip({ method, onPress }: { method: PaymentMethod; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.selectedChipInner}>
        <View style={styles.textAndIcon}>
          {getPaymentIcon(method.icon, { size: 13.5, color: colors.textPrimary })}
          <Text style={styles.chipText}>{getShortTitle(method.id)}</Text>
        </View>
        <View style={styles.greenDot} />
      </View>
    </TouchableOpacity>
  );
}

function Chip({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity
      style={styles.chip}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.chipInner}>
        <View style={styles.iconContainer}>
          <Text style={styles.plusIcon}>+</Text>
        </View>
        <Text style={styles.chipText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

function CustomerChip({ customer, onPress }: { customer: Customer; onPress?: () => void }) {
  const displayName = customer.name || customer.email || customer.phone || 'Customer';
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.selectedChipInner}>
        <View style={styles.textAndIcon}>
          <UserIcon size={13.5} color={colors.textPrimary} />
          <Text style={styles.chipText} numberOfLines={1}>{displayName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ActionChips({
  onPaymentMethod,
  onCustomer,
  onMore,
  selectedPaymentMethod,
  selectedCustomer,
}: ActionChipsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {selectedPaymentMethod ? (
          <PaymentMethodChip method={selectedPaymentMethod} onPress={onPaymentMethod} />
        ) : (
          <Chip label="Payment Method" onPress={onPaymentMethod} />
        )}
        {selectedCustomer ? (
          <CustomerChip customer={selectedCustomer} onPress={onCustomer} />
        ) : (
          <Chip label="Customer" onPress={onCustomer} />
        )}
      </ScrollView>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.375, y: 0 }}
        style={styles.moreChipWrapper}
      >
        <Chip label="More" onPress={onMore} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    maxHeight: 38,
  },
  container: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 80,
    gap: 2,
    maxHeight: 38,
  },
  moreChipWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: 'rgba(242, 242, 244, 0.86)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    padding: 2,
    maxHeight: 38,
  },
  chipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 40,
  },
  iconContainer: {
    width: 13.5,
    height: 13.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  plusIcon: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 14,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.08,
    lineHeight: 18,
    textAlign: 'center',
  },
  selectedChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grey200,
    backgroundColor: colors.background,
  },
  textAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2BC37D',
  },
});
