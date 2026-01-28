import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../constants/colors';
import { HomeIcon, PaymentsIcon, OrdersIcon, MoreIcon } from './icons';

interface TabBarProps {
  activeTab: string;
  onTabPress?: (tab: string) => void;
}

interface TabItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

function TabItem({ icon, label, isActive, onPress }: TabItemProps) {
  return (
    <TouchableOpacity
      style={[styles.tabItem, isActive && styles.tabItemActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function TabBar({ activeTab, onTabPress }: TabBarProps) {
  const handlePress = (tab: string) => {
    onTabPress?.(tab);
  };

  const getIconColor = (tab: string) => {
    return activeTab === tab ? colors.primaryBlue : colors.textPrimary;
  };

  const content = (
    <>
      <TabItem
        icon={<HomeIcon size={20} color={getIconColor('home')} />}
        label="Home"
        isActive={activeTab === 'home'}
        onPress={() => handlePress('home')}
      />
      <TabItem
        icon={<PaymentsIcon size={20} color={getIconColor('payments')} />}
        label="Payments"
        isActive={activeTab === 'payments'}
        onPress={() => handlePress('payments')}
      />
      <TabItem
        icon={<OrdersIcon size={20} color={getIconColor('orders')} />}
        label="Orders"
        isActive={activeTab === 'orders'}
        onPress={() => handlePress('orders')}
      />
      <TabItem
        icon={<MoreIcon size={20} color={getIconColor('more')} />}
        label="More"
        isActive={activeTab === 'more'}
        onPress={() => handlePress('more')}
      />
    </>
  );

  // Use BlurView for iOS glass effect, fallback for other platforms
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.wrapper}>
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          <View style={styles.overlay} />
          <View style={styles.contentContainer}>
            {content}
          </View>
        </BlurView>
      </View>
    );
  }

  // Fallback for Android/Web with semi-transparent gradient-like effect
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  blurContainer: {
    borderRadius: 80,
    overflow: 'hidden',
    height: 56,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 80,
    paddingHorizontal: 6,
    paddingVertical: 5,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 40,
    backgroundColor: 'rgba(36, 32, 32, 0.02)',
  },
  tabItemActive: {
    backgroundColor: 'rgba(36, 32, 32, 0.02)',
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 10,
  },
  tabLabelActive: {
    color: colors.primaryBlue,
  },
});
