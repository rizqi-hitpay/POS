import React, { useRef, useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import KeypadButton from './KeypadButton';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onCalc: () => void;
  onCalcLongPress: (position: { x: number; y: number }) => void;
  onBackspace: () => void;
}

// Base dimensions from Figma design
const BASE_VIEWPORT_HEIGHT = 812;
const BASE_KEYPAD_HEIGHT = 360;
const ROW_GAP = 12;

export default function Keypad({
  onDigit,
  onCalc,
  onCalcLongPress,
  onBackspace,
}: KeypadProps) {
  const { height: viewportHeight } = useWindowDimensions();
  const calcButtonRef = useRef<View>(null);

  // Calculate responsive keypad height based on viewport
  // Ratio: 360/812 = 0.4433
  const keypadHeight = (viewportHeight / BASE_VIEWPORT_HEIGHT) * BASE_KEYPAD_HEIGHT;

  // Calculate row height: (keypadHeight - 3 gaps) / 4 rows
  const rowHeight = (keypadHeight - (ROW_GAP * 3)) / 4;

  const handleCalcLongPress = useCallback(() => {
    calcButtonRef.current?.measureInWindow((x, y, width, height) => {
      // Position the action sheet above the button, centered horizontally
      const position = {
        x: x + (width / 2) - 60, // Center the 120px wide action sheet
        y: viewportHeight - y, // Distance from bottom of screen
      };
      onCalcLongPress(position);
    });
  }, [onCalcLongPress, viewportHeight]);

  return (
    <View style={[styles.container, { height: keypadHeight }]}>
      <View style={[styles.row, { height: rowHeight }]}>
        <KeypadButton label="1" onPress={() => onDigit('1')} />
        <KeypadButton label="2" onPress={() => onDigit('2')} />
        <KeypadButton label="3" onPress={() => onDigit('3')} />
      </View>
      <View style={[styles.row, { height: rowHeight }]}>
        <KeypadButton label="4" onPress={() => onDigit('4')} />
        <KeypadButton label="5" onPress={() => onDigit('5')} />
        <KeypadButton label="6" onPress={() => onDigit('6')} />
      </View>
      <View style={[styles.row, { height: rowHeight }]}>
        <KeypadButton label="7" onPress={() => onDigit('7')} />
        <KeypadButton label="8" onPress={() => onDigit('8')} />
        <KeypadButton label="9" onPress={() => onDigit('9')} />
      </View>
      <View style={[styles.row, { height: rowHeight }]}>
        <View ref={calcButtonRef} style={styles.calcButtonWrapper}>
          <KeypadButton label="+" onPress={onCalc} onLongPress={handleCalcLongPress} variant="action" />
        </View>
        <KeypadButton label="0" onPress={() => onDigit('0')} />
        <KeypadButton label="⌫" onPress={onBackspace} variant="action" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: ROW_GAP,
  },
  row: {
    flexDirection: 'row',
    gap: ROW_GAP,
  },
  calcButtonWrapper: {
    flex: 1,
  },
});
