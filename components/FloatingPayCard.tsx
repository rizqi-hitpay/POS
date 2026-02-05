import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated, Easing, useWindowDimensions, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { TrashIcon } from './icons';
import { ChevronUpIcon, ChevronDownIcon } from './icons/CartIcons';
import { PaymentMethod } from './PaymentMethodSheet';
import { Customer } from './CustomerSheet';
import { getPaymentIcon } from './icons/PaymentIcons';
import { UserIcon } from './icons/CustomerIcons';

interface FloatingPayCardProps {
  amount: number;
  disabled: boolean;
  isLoading?: boolean;
  onPay: () => void;
  onClear: () => void;
  onPaymentMethod: () => void;
  onCustomer: () => void;
  onMore: () => void;
  selectedPaymentMethod: PaymentMethod | null;
  selectedCustomer: Customer | null;
}

const ANIMATION_DURATION = 300;
const CLEAR_BUTTON_SIZE = 52;
const TAX_RATE = 0.10; // 10% tax
const DISCOUNT_RATE = 0.10; // 10% discount
const SURCHARGE_RATE = 0.10; // 10% surcharge

function formatAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
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

function Chip({ label, onPress, initial = false }: { label: string; onPress?: () => void; initial?: boolean }) {
  if (initial) {
    return (
      <TouchableOpacity
        style={styles.initialChip}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.initialChipInner}>
          <View style={styles.initialIconContainer}>
            <Text style={styles.initialPlusIcon}>+</Text>
          </View>
          <Text style={styles.initialChipText}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }

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

function PaymentMethodChip({ method, onPress, initial = false }: { method: PaymentMethod; onPress?: () => void; initial?: boolean }) {
  return (
    <TouchableOpacity style={initial ? styles.initialChip : styles.selectedChip} onPress={onPress} activeOpacity={0.7}>
      <View style={initial ? styles.initialSelectedChipInner : styles.selectedChipInner}>
        <View style={styles.textAndIcon}>
          {getPaymentIcon(method.icon, { size: initial ? 14 : 16, color: colors.textPrimary })}
          <Text style={initial ? styles.initialChipText : styles.chipText}>{getShortTitle(method.id)}</Text>
        </View>
        <View style={styles.greenDot} />
      </View>
    </TouchableOpacity>
  );
}

function CustomerChip({ customer, onPress, initial = false }: { customer: Customer; onPress?: () => void; initial?: boolean }) {
  const displayName = customer.name || customer.email || customer.phone || 'Customer';
  return (
    <TouchableOpacity style={[initial ? styles.initialChip : styles.selectedChip, { flexShrink: 0 }]} onPress={onPress} activeOpacity={0.7}>
      <View style={initial ? styles.initialSelectedChipInner : styles.selectedChipInner}>
        <View style={styles.textAndIcon}>
          <UserIcon size={initial ? 14 : 16} color={colors.textPrimary} />
          <Text style={initial ? styles.initialChipText : styles.chipText}>{displayName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function FloatingPayCard({
  amount,
  disabled,
  isLoading,
  onPay,
  onClear,
  onPaymentMethod,
  onCustomer,
  onMore,
  selectedPaymentMethod,
  selectedCustomer,
}: FloatingPayCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  const showClear = amount > 0;
  const animatedValue = useRef(new Animated.Value(showClear ? 1 : 0)).current;
  const [surchargeExpanded, setSurchargeExpanded] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: showClear ? 1 : 0,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [showClear, animatedValue]);

  // Calculate tax, discount, surcharge and total
  const taxAmount = amount > 0 ? Math.round(amount * TAX_RATE) : 0;
  const discountAmount = amount > 0 ? Math.round(amount * DISCOUNT_RATE) : 0;
  const surchargeAmount = amount > 0 ? Math.round(amount * SURCHARGE_RATE) : 0;
  const totalAmount = amount + taxAmount - discountAmount + surchargeAmount;

  const buttonText = isLoading
    ? 'Initiating payment....'
    : amount > 0
      ? `Pay for ${formatAmount(totalAmount)}`
      : 'Pay';

  // Toggle expanded with animation
  const toggleExpanded = () => {
    const toValue = surchargeExpanded ? 0 : 1;
    setSurchargeExpanded(!surchargeExpanded);
    Animated.timing(expandAnim, {
      toValue,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  // Interpolated values for expand/collapse animation
  // Details container height (collapsed: ~30, expanded: ~90 for 3 rows)
  const detailsHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 90],
  });

  // Opacity for collapsed content (surcharge row)
  const collapsedOpacity = expandAnim.interpolate({
    inputRange: [0, 0.3],
    outputRange: [1, 0],
  });

  // Opacity for expanded content (detail rows)
  const expandedOpacity = expandAnim.interpolate({
    inputRange: [0.7, 1],
    outputRange: [0, 1],
  });

  // Chips left section opacity (fade out when expanding)
  const chipsLeftOpacity = expandAnim.interpolate({
    inputRange: [0, 0.3],
    outputRange: [1, 0],
  });

  // Chevron rotation
  const chevronRotation = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });

  // More chip position (animates from right:12 when collapsed to left:12 when expanded)
  const moreChipWidth = 55;
  const chipsRowWidth = screenWidth - 24;
  const collapsedTranslateX = chipsRowWidth - moreChipWidth - 12 - 16;

  const moreChipTranslateX = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [collapsedTranslateX, 8], // right:16 when collapsed, left:20 when expanded
  });

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

  // Initial state (amount = 0): Simple floating chips + disabled Pay button
  if (amount === 0) {
    return (
      <View style={styles.initialWrapper}>
        {/* Simple chips row */}
        <View style={styles.initialChipsRowWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.initialChipsRow}
          >
            {selectedPaymentMethod ? (
              <PaymentMethodChip method={selectedPaymentMethod} onPress={onPaymentMethod} initial />
            ) : (
              <Chip label="Payment Method" onPress={onPaymentMethod} initial />
            )}
            {selectedCustomer ? (
              <CustomerChip customer={selectedCustomer} onPress={onCustomer} initial />
            ) : (
              <Chip label="Customer" onPress={onCustomer} initial />
            )}
          </ScrollView>
          {/* More chip with gradient fade */}
          <View style={styles.moreChipWrapper}>
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.moreGradient}
            />
            <Chip label="More" onPress={onMore} initial />
          </View>
        </View>
        {/* Simple disabled Pay button */}
        <View style={styles.initialButtonRow}>
          <TouchableOpacity style={styles.initialPayButton} disabled activeOpacity={1}>
            <Text style={styles.initialPayText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Active state (amount > 0): Full glass card with surcharge, clear button, etc.
  return (
    <View style={styles.wrapper}>
      <BlurView intensity={50} tint="light" style={styles.blurContainer}>
        {/* Glass overlay for glass effect */}
        <View style={styles.glassOverlay} />
        <View style={styles.cardContent}>
          {/* Chips Row */}
          <View style={styles.chipsRow}>
            {/* Collapsed chips - fade out */}
            <Animated.View
              pointerEvents={surchargeExpanded ? 'none' : 'auto'}
              style={[styles.chipsLeftWrapper, { opacity: chipsLeftOpacity }]}
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsLeft}
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
            </Animated.View>

            {/* More chip - animates position from right to left */}
            <Animated.View style={[styles.moreChipAnimated, { transform: [{ translateX: moreChipTranslateX }] }]}>
              <Chip label="More" onPress={onMore} />
            </Animated.View>

            {/* Chevron - fixed on right, rotates and shows when expanded */}
            <Animated.View style={[
              styles.chevronButtonFixed,
              {
                opacity: expandAnim,
                transform: [{ rotate: chevronRotation }]
              }
            ]}>
              <TouchableOpacity onPress={toggleExpanded}>
                <ChevronDownIcon size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Surcharge/Details Section */}
          <Animated.View style={{ height: detailsHeight, overflow: 'hidden' }}>
            {/* Collapsed: Surcharge row */}
            <Animated.View
              pointerEvents={surchargeExpanded ? 'none' : 'auto'}
              style={[
                styles.surchargeRow,
                { opacity: collapsedOpacity, position: 'absolute', width: '100%' }
              ]}
            >
              <TouchableOpacity onPress={toggleExpanded} style={styles.surchargeRowInner}>
                <Text style={styles.surchargeLabel}>Surcharge 10%</Text>
                <View style={styles.surchargeValueContainer}>
                  <Text style={styles.surchargeValue}>SGD {(surchargeAmount / 100).toFixed(2)}</Text>
                  <ChevronUpIcon size={13} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            </Animated.View>

            {/* Expanded: Detail rows */}
            <Animated.View
              pointerEvents={surchargeExpanded ? 'auto' : 'none'}
              style={[styles.detailsContainer, { opacity: expandedOpacity }]}
            >
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tax 10%</Text>
                <Text style={styles.detailValue}>SGD {(taxAmount / 100).toFixed(2)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Discount 10%</Text>
                <Text style={styles.detailValueNegative}>SGD -{(discountAmount / 100).toFixed(2)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Surcharge 10%</Text>
                <Text style={styles.detailValue}>SGD {(surchargeAmount / 100).toFixed(2)}</Text>
              </View>
            </Animated.View>
          </Animated.View>

          {/* Pay Button Row */}
          <View style={styles.payButtonRow}>
            <Animated.View
              style={[
                styles.clearButtonContainer,
                {
                  width: clearButtonWidth,
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
              style={[
                styles.payButton,
                disabled && styles.payButtonDisabled,
                isLoading && styles.payButtonLoading,
              ]}
              onPress={onPay}
              activeOpacity={0.7}
              disabled={disabled || isLoading}
            >
              <Text style={[styles.payText, disabled && !isLoading && styles.payTextDisabled]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Initial state styles (amount = 0)
  initialWrapper: {
    marginHorizontal: 12,
    gap: 8,
  },
  initialChipsRowWrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  initialChipsRow: {
    flexDirection: 'row',
    gap: 2,
    paddingRight: 80,
  },
  initialChip: {
    backgroundColor: 'rgba(242,242,244,0.86)',
    borderRadius: 40,
    padding: 2,
    maxHeight: 38,
  },
  initialChipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 40,
  },
  initialIconContainer: {
    width: 13.5,
    height: 13.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialPlusIcon: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 14,
  },
  initialChipText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: -0.08,
    color: colors.textPrimary,
  },
  initialSelectedChipInner: {
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
  moreChipWrapper: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreGradient: {
    width: 16,
    height: '100%',
  },
  initialButtonRow: {
    paddingHorizontal: 0,
  },
  initialPayButton: {
    height: 48,
    backgroundColor: '#ccd4e3',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialPayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8093b8',
    lineHeight: 24,
  },
  // Active state styles (amount > 0)
  wrapper: {
    marginHorizontal: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blurContainer: {
    backgroundColor: 'rgba(245, 245, 245, 0.7)',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#262626',
    opacity: 0.08, // simulate mix-blend-mode color-dodge effect
  },
  cardContent: {
    gap: 4,
  },
  // Chips styles
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    position: 'relative', // Enable absolute positioning for children
  },
  chipsLeftWrapper: {
    flex: 1,
  },
  chipsLeft: {
    flexDirection: 'row',
    gap: 2,
    paddingRight: 60,
  },
  chip: {
    backgroundColor: '#f8f9fc',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  selectedChip: {
    // No padding - selectedChipInner handles all styling
  },
  chipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconContainer: {
    width: 12,
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  plusIcon: {
    fontSize: 12,
    fontWeight: '300',
    color: colors.textPrimary,
    lineHeight: 12,
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
    paddingVertical: 4,
    borderRadius: 20,
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
  // Surcharge row styles
  surchargeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  surchargeRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  surchargeLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  surchargeValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  surchargeValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  // Expanded state styles
  moreChipAnimated: {
    position: 'absolute',
    left: 12,
  },
  chevronButtonFixed: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  detailValueNegative: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  // Pay button row styles
  payButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
    gap: 8,
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
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 142,
  },
  payButtonDisabled: {
    backgroundColor: colors.payButtonDisabled,
  },
  payButtonLoading: {
    backgroundColor: colors.buttonLoadingBackground,
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
