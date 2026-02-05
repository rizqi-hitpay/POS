import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
          {/* Terminal Image - Behind everything */}
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
              <Image
                source={require('../assets/Terminal.png')}
                style={styles.terminalImage}
                resizeMode="contain"
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Total Amount Header - On top of image */}
          <View style={styles.header}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>{formatTotal(amount)}</Text>
          </View>

          {/* Instruction - On top of image */}
          <View style={styles.instructionContainer}>
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
    zIndex: 1,
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
  terminalTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  terminalContainer: {
    width: '100%',
    alignItems: 'center',
  },
  terminalImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.6,
  },
  instructionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    zIndex: 1,
  },
  instruction: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    zIndex: 1,
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
});
