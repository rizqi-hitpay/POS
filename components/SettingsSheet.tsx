import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from './BottomSheet';
import { colors } from '../constants/colors';

interface SettingsSheetProps {
  visible: boolean;
  onClose: () => void;
  includeAdditionalDetail: boolean;
  onToggleAdditionalDetail: (value: boolean) => void;
}

function Checkbox({ checked, onPress }: { checked: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.checkbox, checked && styles.checkboxChecked]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
}

export default function SettingsSheet({
  visible,
  onClose,
  includeAdditionalDetail,
  onToggleAdditionalDetail,
}: SettingsSheetProps) {
  const handleToggle = () => {
    onToggleAdditionalDetail(!includeAdditionalDetail);
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} title="Settings">
      <TouchableOpacity
        style={styles.settingRow}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.settingLabel}>Include automatic additional detail</Text>
        <Checkbox checked={includeAdditionalDetail} onPress={handleToggle} />
      </TouchableOpacity>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey200,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    flex: 1,
    paddingRight: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.grey300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  checkboxChecked: {
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
