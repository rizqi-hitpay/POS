import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PaymentSuccessSheetProps {
  visible: boolean;
  amount: number; // in cents
  onComplete: () => void;
}

function formatTotal(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

const AUTO_CLOSE_DELAY = 1500;

export default function PaymentSuccessSheet({
  visible,
  amount,
  onComplete,
}: PaymentSuccessSheetProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [modalVisible, setModalVisible] = useState(false);

  // Animation values for success checkmark
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;
  const circleScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      translateX.setValue(SCREEN_WIDTH);

      // Reset animations
      checkmarkScale.setValue(0);
      checkmarkOpacity.setValue(0);
      circleScale.setValue(0.5);

      // Slide in
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Animate success checkmark
        Animated.parallel([
          Animated.spring(circleScale, {
            toValue: 1,
            friction: 5,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.spring(checkmarkScale, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
            delay: 100,
          }),
          Animated.timing(checkmarkOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();

        // Auto-close after delay
        setTimeout(() => {
          onComplete();
        }, AUTO_CLOSE_DELAY);
      });
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

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onComplete}
        />
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
          <Pressable style={styles.content} onPress={onComplete}>
            {/* Success Circle */}
            <Animated.View
              style={[
                styles.successCircle,
                {
                  transform: [{ scale: circleScale }],
                },
              ]}
            >
              <Animated.View
                style={[
                  styles.checkmarkWrapper,
                  {
                    transform: [{ scale: checkmarkScale }],
                    opacity: checkmarkOpacity,
                  },
                ]}
              >
                <SuccessCheckmark />
              </Animated.View>
            </Animated.View>

            {/* Success Text */}
            <Text style={styles.successText}>Payment successful</Text>
            <Text style={styles.amountText}>{formatTotal(amount)}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function SuccessCheckmark() {
  return (
    <View style={styles.checkmark}>
      <View style={styles.checkmarkStem} />
      <View style={styles.checkmarkKick} />
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#34C759',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  checkmarkWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 50,
    height: 50,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 5,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 2.5,
    transform: [{ rotate: '45deg' }],
    top: 8,
    left: 30,
  },
  checkmarkKick: {
    position: 'absolute',
    width: 5,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 2.5,
    transform: [{ rotate: '-45deg' }],
    top: 20,
    left: 12,
  },
  successText: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  amountText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '500',
    color: colors.textTertiary,
    textAlign: 'center',
  },
});
