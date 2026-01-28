import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { colors } from '../constants/colors';
import { PaymentMethod } from './PaymentMethodSheet';
import { Customer } from './CustomerSheet';
import { getPaymentIcon, PaymentIconType } from './icons/PaymentIcons';
import {
  BackArrowIcon,
  RefreshIcon,
  EditPencilIcon,
  TrashBinIcon,
  DiscountIcon,
  DotsVerticalIcon,
  DocumentIcon,
  AddPaymentIcon,
  UserAddIcon,
} from './icons/CartIcons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface CartItem {
  id: string;
  label: string;
  amount: number; // in cents
  type: 'item' | 'tax' | 'discount' | 'surcharge';
}

interface CartSheetProps {
  visible: boolean;
  onClose: () => void;
  amount: number; // in cents
  paymentMethod?: PaymentMethod | null;
  customer?: Customer | null;
  onCharge?: () => void;
  onChangePaymentMethod?: () => void;
  onChangeCustomer?: () => void;
  onRemoveCustomer?: () => void;
}

function formatAmount(cents: number): string {
  const isNegative = cents < 0;
  const absCents = Math.abs(cents);
  const formatted = `SGD ${isNegative ? '-' : ''}${(absCents / 100).toFixed(2)}`;
  return formatted;
}

function formatTotal(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// Get payment method description
function getPaymentDescription(type: PaymentIconType): string {
  const descriptions: Record<PaymentIconType, string> = {
    Terminal: 'Pay via terminal',
    TapToPay: 'Accept contactless payment',
    ScanToPay: 'Accept QR payment',
    Card: 'Key in card details',
    PaymentLink: 'Create a payment link',
    Cash: 'Record cash transaction',
    Wallet: 'Accept e-wallet payment',
  };
  return descriptions[type] || 'Pay via terminal';
}

export default function CartSheet({
  visible,
  onClose,
  amount,
  paymentMethod,
  customer,
  onCharge,
  onChangePaymentMethod,
  onChangeCustomer,
  onRemoveCustomer,
}: CartSheetProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate cart items based on amount
  const baseAmount = amount;
  const taxAmount = Math.round(baseAmount * 0.1); // 10% tax
  const discountAmount = Math.round(baseAmount * -0.1); // 10% discount (negative)
  const surchargeAmount = Math.round(baseAmount * 0.1); // 10% surcharge
  const totalAmount = baseAmount + taxAmount + discountAmount + surchargeAmount;

  const cartItems: CartItem[] = [
    { id: '1', label: 'Quick Sale', amount: baseAmount, type: 'item' },
  ];

  const adjustments: CartItem[] = [
    { id: '2', label: 'Tax 10%', amount: taxAmount, type: 'tax' },
    { id: '3', label: 'Discount 10%', amount: discountAmount, type: 'discount' },
    { id: '4', label: 'Surcharge 10%', amount: surchargeAmount, type: 'surcharge' },
  ];

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      translateX.setValue(SCREEN_WIDTH);

      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateX, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, translateX]);

  const handleCharge = () => {
    onCharge?.();
    onClose();
  };

  const hasPaymentMethod = !!paymentMethod;
  const customerDisplay = customer?.name || customer?.email || customer?.phone || '';

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateX }],
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top }]}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <BackArrowIcon size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cart</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Payment Method Card */}
            <View style={styles.topCards}>
              <TouchableOpacity
                style={styles.paymentMethodCard}
                onPress={onChangePaymentMethod}
                activeOpacity={0.7}
              >
                <View style={styles.paymentMethodInner}>
                  <View style={[
                    styles.paymentIconContainer,
                    !hasPaymentMethod && styles.paymentIconContainerEmpty
                  ]}>
                    {hasPaymentMethod ? (
                      getPaymentIcon(paymentMethod.icon, {
                        size: 38,
                        color: colors.textPrimary,
                      })
                    ) : (
                      <AddPaymentIcon size={38} color={colors.primaryBlue} />
                    )}
                  </View>
                  <View style={styles.paymentInfo}>
                    <Text style={[
                      styles.paymentTitle,
                      !hasPaymentMethod && styles.paymentTitleEmpty
                    ]}>
                      {hasPaymentMethod ? paymentMethod.title : 'Select Payment Method'}
                    </Text>
                    <Text style={styles.paymentDescription}>
                      {hasPaymentMethod
                        ? getPaymentDescription(paymentMethod.icon)
                        : 'Tap to choose how to accept payment'}
                    </Text>
                  </View>
                  {hasPaymentMethod && (
                    <TouchableOpacity
                      style={styles.refreshButton}
                      onPress={onChangePaymentMethod}
                    >
                      <RefreshIcon size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>

              {/* Customer Card or Add Customer Button */}
              {customerDisplay ? (
                <View style={styles.customerCard}>
                  <View style={styles.customerInner}>
                    <Text style={styles.customerEmail} numberOfLines={1}>
                      {customerDisplay}
                    </Text>
                    <View style={styles.customerActions}>
                      <TouchableOpacity
                        style={styles.customerActionButton}
                        onPress={onChangeCustomer}
                      >
                        <EditPencilIcon size={13.5} color={colors.textPrimary} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.customerActionButton}
                        onPress={onRemoveCustomer}
                      >
                        <TrashBinIcon size={13.5} color={colors.textPrimary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addCustomerButton}
                  onPress={onChangeCustomer}
                  activeOpacity={0.7}
                >
                  <UserAddIcon size={20} color={colors.primaryBlue} />
                  <Text style={styles.addCustomerText}>Add a Customer</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Cart Items List */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Main Items */}
              <View style={styles.listCard}>
                {cartItems.map((item) => (
                  <View key={item.id} style={styles.listItem}>
                    <Text style={styles.listItemLabel}>{item.label}</Text>
                    <Text style={styles.listItemAmount}>{formatAmount(item.amount)}</Text>
                  </View>
                ))}
              </View>

              {/* Adjustments */}
              <View style={styles.listCard}>
                {adjustments.map((item) => (
                  <View key={item.id} style={styles.listItem}>
                    <Text style={styles.listItemLabelLight}>{item.label}</Text>
                    <Text style={styles.listItemAmount}>{formatAmount(item.amount)}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <BlurView intensity={40} tint="light" style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <DiscountIcon size={20} color={colors.primaryBlue} />
                <Text style={styles.actionButtonText}>Add a Discount</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <DotsVerticalIcon size={20} color={colors.primaryBlue} />
                <Text style={styles.actionButtonText}>More Actions</Text>
              </TouchableOpacity>
            </BlurView>
          </View>

          {/* Bottom Bar */}
          <View style={styles.bottomBar}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{formatTotal(totalAmount)}</Text>
            </View>
            <View style={styles.ctaRow}>
              <TouchableOpacity style={styles.documentButton}>
                <DocumentIcon size={28} color={colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.chargeButton}
                onPress={handleCharge}
                activeOpacity={0.8}
              >
                <Text style={styles.chargeButtonText}>Charge</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheet: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#F8F9FC',
    borderTopLeftRadius: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
    marginRight: 24,
  },
  headerSpacer: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  topCards: {
    gap: 4,
    marginBottom: 12,
  },
  paymentMethodCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey200,
    padding: 8,
  },
  paymentMethodInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F6F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconContainerEmpty: {
    backgroundColor: '#EBF2FD',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  paymentTitleEmpty: {
    color: colors.primaryBlue,
  },
  paymentDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textTertiary,
    lineHeight: 20,
    letterSpacing: 0.15,
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey200,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  customerCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey200,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  customerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customerEmail: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  customerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customerActionButton: {
    padding: 4,
  },
  addCustomerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey200,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  addCustomerText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryBlue,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 12,
    paddingBottom: 70,
  },
  listCard: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  listItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  listItemLabelLight: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.15,
    lineHeight: 20,
  },
  listItemAmount: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 8,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey200,
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryBlue,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bottomBar: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#B7B7B7',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  documentButton: {
    width: 48,
    height: 48,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grey300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chargeButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chargeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.08,
    lineHeight: 24,
  },
});
