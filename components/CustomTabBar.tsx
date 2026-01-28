import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../constants/colors';
import { HomeIcon, PaymentsIcon, OrdersIcon, MoreIcon } from './icons';

const TAB_ICONS: Record<string, React.FC<{ size: number; color: string }>> = {
  Home: HomeIcon,
  Payments: PaymentsIcon,
  Orders: OrdersIcon,
  More: MoreIcon,
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const renderTabItems = () => {
    return state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

      const isFocused = state.index === index;
      const IconComponent = TAB_ICONS[route.name];
      const iconColor = isFocused ? colors.primaryBlue : colors.textPrimary;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name, route.params);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          key={route.key}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={styles.tabItem}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            {IconComponent && <IconComponent size={20} color={iconColor} />}
          </View>
          <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
            {typeof label === 'string' ? label : route.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  // iOS glass effect with BlurView
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.wrapper}>
        <BlurView intensity={80} tint="light" style={styles.blurContainer}>
          <View style={styles.overlay} />
          <View style={styles.contentContainer}>
            {renderTabItems()}
          </View>
        </BlurView>
      </View>
    );
  }

  // Fallback for Android/Web
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {renderTabItems()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
