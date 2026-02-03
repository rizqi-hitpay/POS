import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InitiatingPaymentSheetProps {
  visible: boolean;
  onComplete: () => void;
}

const CHECKLIST_ITEMS = 4;
const ITEM_ANIMATION_DURATION = 400;
const DELAY_BETWEEN_ITEMS = 300;
const TOTAL_ANIMATION_TIME = 2000;

export default function InitiatingPaymentSheet({
  visible,
  onComplete,
}: InitiatingPaymentSheetProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [statusText, setStatusText] = useState('Initiating orders...');

  // Animation values for each checklist item (progress from 0 to 1)
  const itemAnimations = useRef(
    Array.from({ length: CHECKLIST_ITEMS }, () => new Animated.Value(0))
  ).current;

  // Checkmark animation for third item
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const checkmarkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setStatusText('Initiating orders...');
      translateX.setValue(SCREEN_WIDTH);

      // Reset animations
      itemAnimations.forEach(anim => anim.setValue(0));
      checkmarkScale.setValue(0);
      checkmarkOpacity.setValue(0);

      // Slide in animation
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Start checklist animation sequence
        startChecklistAnimation();
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

  const startChecklistAnimation = () => {
    // Animate each item sequentially
    const animations = itemAnimations.map((anim, index) => {
      return Animated.sequence([
        Animated.delay(index * DELAY_BETWEEN_ITEMS),
        Animated.timing(anim, {
          toValue: 1,
          duration: ITEM_ANIMATION_DURATION,
          useNativeDriver: false,
        }),
      ]);
    });

    Animated.parallel(animations).start();

    // Change text after first two items
    setTimeout(() => {
      setStatusText('Initiating payment...');
    }, 2 * DELAY_BETWEEN_ITEMS + ITEM_ANIMATION_DURATION / 2);

    // Show checkmark on third item
    setTimeout(() => {
      Animated.parallel([
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, 2 * DELAY_BETWEEN_ITEMS + ITEM_ANIMATION_DURATION);

    // Complete and transition to payment sheet
    setTimeout(() => {
      onComplete();
    }, TOTAL_ANIMATION_TIME);
  };

  const renderChecklistItem = (index: number) => {
    const progress = itemAnimations[index];
    const isThirdItem = index === 2;

    return (
      <View key={index} style={styles.checklistItem}>
        <View style={styles.barContainer}>
          <View style={styles.barBackground} />
          <Animated.View
            style={[
              styles.barFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        {isThirdItem && (
          <Animated.View
            style={[
              styles.checkmarkContainer,
              {
                transform: [{ scale: checkmarkScale }],
                opacity: checkmarkOpacity,
              },
            ]}
          >
            <CheckmarkIcon />
          </Animated.View>
        )}
      </View>
    );
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
          <View style={styles.content}>
            <View style={styles.checklistContainer}>
              {Array.from({ length: CHECKLIST_ITEMS }, (_, i) =>
                renderChecklistItem(i)
              )}
            </View>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function CheckmarkIcon() {
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
  checklistContainer: {
    width: '100%',
    maxWidth: 280,
    gap: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barContainer: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  barBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.grey200,
  },
  barFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.primaryBlue,
    borderRadius: 6,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 12,
    height: 12,
    position: 'relative',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 2,
    height: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
    top: 2,
    left: 7,
  },
  checkmarkKick: {
    position: 'absolute',
    width: 2,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
    top: 5,
    left: 3,
  },
  statusText: {
    marginTop: 32,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
