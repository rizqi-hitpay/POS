import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import SegmentedControl from './SegmentedControl';

interface HeaderProps {
  selectedTab: 'keypad' | 'products';
  onTabChange: (tab: 'keypad' | 'products') => void;
  onProfilePress?: () => void;
}

export default function Header({ selectedTab, onTabChange, onProfilePress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatar} onPress={onProfilePress} activeOpacity={0.7}>
        <Text style={styles.avatarText}>Locally</Text>
      </TouchableOpacity>
      <SegmentedControl
        selectedTab={selectedTab}
        onTabChange={onTabChange}
      />
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.grey300,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 6,
    fontWeight: '600',
  },
  placeholder: {
    width: 32,
  },
});
