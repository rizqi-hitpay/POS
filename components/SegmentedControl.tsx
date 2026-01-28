import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

interface SegmentedControlProps {
  selectedTab: 'keypad' | 'products';
  onTabChange: (tab: 'keypad' | 'products') => void;
}

export default function SegmentedControl({
  selectedTab,
  onTabChange,
}: SegmentedControlProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, selectedTab === 'keypad' && styles.segmentActive]}
        onPress={() => onTabChange('keypad')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.segmentText,
            selectedTab === 'keypad' && styles.segmentTextActive,
          ]}
        >
          Keypad
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.segment, selectedTab === 'products' && styles.segmentActive]}
        onPress={() => onTabChange('products')}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.segmentText,
            selectedTab === 'products' && styles.segmentTextActive,
          ]}
        >
          Products
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.segmentBackground,
    borderRadius: 100,
    padding: 4,
    height: 36,
    width: 218,
  },
  segment: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.segmentActive,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: -0.08,
  },
  segmentTextActive: {
    fontWeight: '600',
  },
});
