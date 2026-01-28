import React from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { PlusIcon, MinusIcon, MultiplyIcon, DivideIcon } from './icons';
import { colors } from '../constants/colors';

type Operator = '+' | '-' | '*' | '/';

interface OperatorActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectOperator: (operator: Operator) => void;
  position: { x: number; y: number };
}

interface OperatorButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
}

function OperatorButton({ icon, onPress }: OperatorButtonProps) {
  return (
    <TouchableOpacity style={styles.operatorButton} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.operatorButtonBg} />
      {icon}
    </TouchableOpacity>
  );
}

export default function OperatorActionSheet({
  visible,
  onClose,
  onSelectOperator,
  position,
}: OperatorActionSheetProps) {
  const handleSelect = (operator: Operator) => {
    onSelectOperator(operator);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={[
            styles.container,
            {
              position: 'absolute',
              left: position.x,
              bottom: position.y,
            },
          ]}
        >
          <BlurView intensity={40} tint="light" style={styles.blurContainer}>
            <View style={styles.glassOverlay} />
            <View style={styles.content}>
              <OperatorButton
                icon={<DivideIcon size={32} color={colors.textPrimary} />}
                onPress={() => handleSelect('/')}
              />
              <OperatorButton
                icon={<MultiplyIcon size={32} color={colors.textPrimary} />}
                onPress={() => handleSelect('*')}
              />
              <OperatorButton
                icon={<MinusIcon size={32} color={colors.textPrimary} />}
                onPress={() => handleSelect('-')}
              />
              <OperatorButton
                icon={<PlusIcon size={32} color={colors.textPrimary} />}
                onPress={() => handleSelect('+')}
              />
            </View>
          </BlurView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    width: 120,
    borderRadius: 34,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  blurContainer: {
    borderRadius: 34,
    overflow: 'hidden',
  },
  glassOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(245, 245, 245, 0.6)',
    borderRadius: 34,
  },
  content: {
    padding: 14,
    gap: 10,
  },
  operatorButton: {
    height: 48,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  operatorButtonBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(120, 120, 128, 0.16)',
    borderRadius: 100,
  },
});
