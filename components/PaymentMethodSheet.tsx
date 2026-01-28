import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import BottomSheet from './BottomSheet';
import PaymentMethodItem from './PaymentMethodItem';
import { PaymentIconType } from './icons/PaymentIcons';

export interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: PaymentIconType;
  connected?: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'terminal',
    title: 'Card Terminal',
    description: 'Swipe or tap card on terminal',
    icon: 'Terminal',
    connected: true,
  },
  {
    id: 'tap-to-pay',
    title: 'Tap to Pay',
    description: 'Accept contactless payment',
    icon: 'TapToPay',
    connected: true,
  },
  {
    id: 'scan-to-pay',
    title: 'Scan to Pay',
    description: 'Accept installment and e-wallet payments',
    icon: 'ScanToPay',
  },
  {
    id: 'card-details',
    title: 'Key in Card Details',
    description: "Enter customer's card details",
    icon: 'Card',
  },
  {
    id: 'payment-link',
    title: 'Payment Link',
    description: 'Create a payment link',
    icon: 'PaymentLink',
  },
  {
    id: 'cash',
    title: 'Cash',
    description: 'Record a cash transaction',
    icon: 'Cash',
  },
  {
    id: 'paynow',
    title: 'PayNow/PayLah!',
    description: 'Accept a PayNow or PayLah! transaction',
    icon: 'Wallet',
  },
  {
    id: 'wechat',
    title: 'WeChat Pay',
    description: 'Accept WeChat',
    icon: 'Wallet',
  },
];

interface PaymentMethodSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect?: (method: PaymentMethod) => void;
}

export default function PaymentMethodSheet({
  visible,
  onClose,
  onSelect,
}: PaymentMethodSheetProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Reset selection when sheet opens
  useEffect(() => {
    if (visible) {
      setSelectedId(null);
    }
  }, [visible]);

  const handleSelect = (method: PaymentMethod) => {
    setSelectedId(method.id);
    onSelect?.(method);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title="Default Payment Method"
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {paymentMethods.map((method) => (
          <PaymentMethodItem
            key={method.id}
            icon={method.icon}
            title={method.title}
            description={method.description}
            connected={method.connected}
            selected={method.id === selectedId}
            onPress={() => handleSelect(method)}
          />
        ))}
      </ScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 8,
    paddingBottom: 16,
  },
});
