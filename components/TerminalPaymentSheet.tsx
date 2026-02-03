import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface TerminalPaymentSheetProps {
  visible: boolean;
  amount: number; // in cents
  onCancel: () => void;
  onSuccess: () => void;
}

function formatTotal(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function TerminalPaymentSheet({
  visible,
  amount,
  onCancel,
  onSuccess,
}: TerminalPaymentSheetProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [modalVisible, setModalVisible] = useState(false);

  // Animation for terminal tap effect
  const terminalScale = useRef(new Animated.Value(1)).current;

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
  }, [visible]);

  const handleTerminalPress = () => {
    // Tap animation
    Animated.sequence([
      Animated.timing(terminalScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(terminalScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onSuccess();
    });
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateX }],
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {/* Total Amount Header */}
          <View style={styles.header}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>{formatTotal(amount)}</Text>
          </View>

          {/* Terminal Area */}
          <View style={styles.content}>
            <TouchableOpacity
              onPress={handleTerminalPress}
              activeOpacity={0.9}
              style={styles.terminalTouchable}
            >
              <Animated.View
                style={[
                  styles.terminalContainer,
                  { transform: [{ scale: terminalScale }] },
                ]}
              >
                <TerminalIllustration />
              </Animated.View>
            </TouchableOpacity>
            <Text style={styles.instruction}>Tap the card on the terminal</Text>
          </View>

          {/* Cancel Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function TerminalIllustration() {
  return (
    <View style={styles.terminal}>
      {/* Terminal body */}
      <View style={styles.terminalBody}>
        {/* Screen area */}
        <View style={styles.terminalScreen}>
          <View style={styles.screenLine} />
          <View style={[styles.screenLine, styles.screenLineShort]} />
        </View>
        {/* Keypad area */}
        <View style={styles.terminalKeypad}>
          {Array.from({ length: 12 }, (_, i) => (
            <View key={i} style={styles.keypadButton} />
          ))}
        </View>
        {/* Card slot indicator */}
        <View style={styles.cardSlot} />
      </View>
      {/* Contactless icon */}
      <View style={styles.contactlessIcon}>
        <View style={styles.contactlessWave1} />
        <View style={styles.contactlessWave2} />
        <View style={styles.contactlessWave3} />
      </View>
    </View>
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
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textTertiary,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  terminalTouchable: {
    alignItems: 'center',
  },
  terminalContainer: {
    alignItems: 'center',
  },
  instruction: {
    marginTop: 32,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  cancelButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E53935',
  },
  // Terminal illustration styles
  terminal: {
    alignItems: 'center',
  },
  terminalBody: {
    width: 140,
    height: 200,
    backgroundColor: colors.grey100,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.grey300,
  },
  terminalScreen: {
    width: '100%',
    height: 50,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    justifyContent: 'center',
    gap: 6,
  },
  screenLine: {
    height: 8,
    backgroundColor: '#81C784',
    borderRadius: 4,
  },
  screenLineShort: {
    width: '60%',
  },
  terminalKeypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 90,
    gap: 6,
    justifyContent: 'center',
  },
  keypadButton: {
    width: 24,
    height: 20,
    backgroundColor: colors.grey300,
    borderRadius: 4,
  },
  cardSlot: {
    position: 'absolute',
    bottom: 8,
    width: 40,
    height: 6,
    backgroundColor: colors.textPrimary,
    borderRadius: 3,
  },
  contactlessIcon: {
    marginTop: 16,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactlessWave1: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primaryBlue,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  contactlessWave2: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.primaryBlue,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  contactlessWave3: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primaryBlue,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
});
