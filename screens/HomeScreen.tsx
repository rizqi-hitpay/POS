import React, { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import Header from '../components/Header';
import AmountDisplay from '../components/AmountDisplay';
import DescriptionInput from '../components/DescriptionInput';
import Keypad from '../components/Keypad';
import ActionChips from '../components/ActionChips';
import PayButtonRow from '../components/PayButtonRow';
import FloatingPayCard from '../components/FloatingPayCard';
import ProductsView from '../components/ProductsView';
import OperatorActionSheet from '../components/OperatorActionSheet';
import PaymentMethodSheet, { PaymentMethod } from '../components/PaymentMethodSheet';
import CustomerSheet, { Customer } from '../components/CustomerSheet';
import CartSheet from '../components/CartSheet';
import SettingsSheet from '../components/SettingsSheet';
import useKeypadInput, { Operator } from '../hooks/useKeypadInput';

const STACKED_SCALE = 327 / 375; // ~0.87

const BOTTOM_SECTION_OFFSET = 0;

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState<'keypad' | 'products'>('keypad');
  const [description, setDescription] = useState('');
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [actionSheetPosition, setActionSheetPosition] = useState({ x: 0, y: 0 });
  const [paymentSheetVisible, setPaymentSheetVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [customerSheetVisible, setCustomerSheetVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [cartSheetVisible, setCartSheetVisible] = useState(false);
  const [settingsSheetVisible, setSettingsSheetVisible] = useState(false);
  const [includeAdditionalDetail, setIncludeAdditionalDetail] = useState(false);

  // Animation values for stacked modal effect (payment/customer sheets)
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderRadiusAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  // Animation value for cart push transition
  const translateXAnim = useRef(new Animated.Value(0)).current;

  // Stacked modal effect for payment/customer/settings sheets
  useEffect(() => {
    const stackedSheetVisible = paymentSheetVisible || customerSheetVisible || settingsSheetVisible;
    if (stackedSheetVisible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: STACKED_SCALE,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(borderRadiusAnim, {
          toValue: 16,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(translateYAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (!cartSheetVisible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(borderRadiusAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [paymentSheetVisible, customerSheetVisible, settingsSheetVisible, cartSheetVisible, scaleAnim, borderRadiusAnim, translateYAnim]);

  // Push/slide transition for cart sheet
  useEffect(() => {
    if (cartSheetVisible) {
      Animated.timing(translateXAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [cartSheetVisible, translateXAnim]);

  const {
    cents,
    expression,
    handleDigit,
    handleBackspace,
    handleCalc,
    handleClear,
    handleSelectOperator,
  } = useKeypadInput();

  const handlePay = () => {
    // Always open cart sheet when Pay button is clicked
    setCartSheetVisible(true);
  };

  const handleClearAll = useCallback(() => {
    handleClear();
    setDescription('');
  }, [handleClear]);

  const handleCalcLongPress = useCallback((position: { x: number; y: number }) => {
    // Only show if there's a first operand entered
    if (cents > 0 || expression) {
      setActionSheetPosition(position);
      setActionSheetVisible(true);
    }
  }, [cents, expression]);

  const handleCloseActionSheet = useCallback(() => {
    setActionSheetVisible(false);
  }, []);

  const handleOperatorSelect = useCallback((operator: Operator) => {
    handleSelectOperator(operator);
  }, [handleSelectOperator]);

  const handleOpenPaymentSheet = useCallback(() => {
    setPaymentSheetVisible(true);
  }, []);

  const handleClosePaymentSheet = useCallback(() => {
    setPaymentSheetVisible(false);
  }, []);

  const handleSelectPaymentMethod = useCallback((method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  }, []);

  const handleOpenCustomerSheet = useCallback(() => {
    setCustomerSheetVisible(true);
  }, []);

  const handleCloseCustomerSheet = useCallback(() => {
    setCustomerSheetVisible(false);
  }, []);

  const handleSelectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
  }, []);

  const handleOpenCartSheet = useCallback(() => {
    setCartSheetVisible(true);
  }, []);

  const handleCloseCartSheet = useCallback(() => {
    setCartSheetVisible(false);
  }, []);

  const handleRemoveCustomer = useCallback(() => {
    setSelectedCustomer(null);
  }, []);

  const handleCharge = useCallback(() => {
    console.log('Charge pressed', { cents, expression, description, selectedPaymentMethod, selectedCustomer });
  }, [cents, expression, description, selectedPaymentMethod, selectedCustomer]);

  const handleOpenSettingsSheet = useCallback(() => {
    setSettingsSheetVisible(true);
  }, []);

  const handleCloseSettingsSheet = useCallback(() => {
    setSettingsSheetVisible(false);
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [
              { scale: scaleAnim },
              { translateY: translateYAnim },
              { translateX: translateXAnim },
            ],
            borderRadius: borderRadiusAnim,
          },
        ]}
      >
        <SafeAreaView style={styles.container} edges={['top']}>
          <Header
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            onProfilePress={handleOpenSettingsSheet}
          />

          {selectedTab === 'keypad' ? (
            <View style={styles.content}>
              <View style={styles.mainContent}>
                <View style={styles.amountSection}>
                  <AmountDisplay cents={cents} expression={expression} />
                  <DescriptionInput value={description} onChangeText={setDescription} />
                </View>
                <Keypad
                  onDigit={handleDigit}
                  onCalc={handleCalc}
                  onCalcLongPress={handleCalcLongPress}
                  onBackspace={handleBackspace}
                />
              </View>
              <View style={styles.bottomSection}>
                {includeAdditionalDetail ? (
                  <FloatingPayCard
                    amount={cents}
                    disabled={cents === 0}
                    onPay={handlePay}
                    onClear={handleClearAll}
                    onPaymentMethod={handleOpenPaymentSheet}
                    onCustomer={handleOpenCustomerSheet}
                    onMore={handleOpenCartSheet}
                    selectedPaymentMethod={selectedPaymentMethod}
                    selectedCustomer={selectedCustomer}
                  />
                ) : (
                  <>
                    <ActionChips
                      onPaymentMethod={handleOpenPaymentSheet}
                      onCustomer={handleOpenCustomerSheet}
                      onMore={handleOpenCartSheet}
                      selectedPaymentMethod={selectedPaymentMethod}
                      selectedCustomer={selectedCustomer}
                    />
                    <PayButtonRow
                      amount={cents}
                      disabled={cents === 0}
                      onPay={handlePay}
                      onClear={handleClearAll}
                    />
                  </>
                )}
              </View>
              <OperatorActionSheet
                visible={actionSheetVisible}
                onClose={handleCloseActionSheet}
                onSelectOperator={handleOperatorSelect}
                position={actionSheetPosition}
              />
            </View>
          ) : (
            <ProductsView />
          )}
        </SafeAreaView>
      </Animated.View>

      <PaymentMethodSheet
        visible={paymentSheetVisible}
        onClose={handleClosePaymentSheet}
        onSelect={handleSelectPaymentMethod}
      />

      <CustomerSheet
        visible={customerSheetVisible}
        onClose={handleCloseCustomerSheet}
        onSelect={handleSelectCustomer}
      />

      <CartSheet
        visible={cartSheetVisible}
        onClose={handleCloseCartSheet}
        amount={cents}
        paymentMethod={selectedPaymentMethod}
        customer={selectedCustomer}
        onCharge={handleCharge}
        onChangePaymentMethod={handleOpenPaymentSheet}
        onChangeCustomer={handleOpenCustomerSheet}
        onRemoveCustomer={handleRemoveCustomer}
      />

      <SettingsSheet
        visible={settingsSheetVisible}
        onClose={handleCloseSettingsSheet}
        includeAdditionalDetail={includeAdditionalDetail}
        onToggleAdditionalDetail={setIncludeAdditionalDetail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  animatedContainer: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingVertical: 8,
    gap: 20,
  },
  amountSection: {
    gap: 8,
  },
  bottomSection: {
    position: 'absolute',
    bottom: BOTTOM_SECTION_OFFSET,
    left: 0,
    right: 0,
    gap: 8,
    paddingVertical: 8,
  },
});
