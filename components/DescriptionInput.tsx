import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';
import { EditIcon } from './icons';

interface DescriptionInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function DescriptionInput({ value, onChangeText }: DescriptionInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <EditIcon size={14} color={colors.primaryBlue} />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add description"
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.grey200,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    gap: 8,
  },
  iconContainer: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey300,
    paddingVertical: 8,
  },
  input: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: 0.25,
    lineHeight: 20,
    padding: 0,
    textAlign: 'center',
  },
});
