import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { UserIcon, PhoneIcon, EmailIcon } from './icons/CustomerIcons';

interface CustomerItemProps {
  name?: string;
  phone?: string;
  email?: string;
  initials?: string;
  selected?: boolean;
  onPress?: () => void;
}

export default function CustomerItem({
  name,
  phone,
  email,
  initials,
  selected,
  onPress,
}: CustomerItemProps) {
  // Display name or phone as title
  const displayTitle = name || phone || 'Customer';

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        {initials ? (
          <Text style={styles.initials}>{initials}</Text>
        ) : (
          <UserIcon size={20} color={colors.textTertiary} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {displayTitle}
        </Text>
        <View style={styles.details}>
          {phone && (
            <View style={styles.detailRow}>
              <PhoneIcon size={14} color={colors.textTertiary} />
              <Text style={styles.detailText}>{phone}</Text>
            </View>
          )}
          {email && (
            <View style={styles.detailRow}>
              <EmailIcon size={14} color={colors.textTertiary} />
              <Text style={styles.detailText} numberOfLines={1}>
                {email}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  containerSelected: {
    borderWidth: 1,
    borderColor: colors.primaryBlue,
    borderRadius: 8,
    marginHorizontal: 0,
    shadowColor: 'rgba(12, 8, 56, 1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F6F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 20,
  },
  details: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textTertiary,
    lineHeight: 18,
    flex: 1,
  },
});
