import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { SearchIcon } from './icons/CustomerIcons';
import CustomerItem from './CustomerItem';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_TOP_OFFSET = 48;

export interface Customer {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  initials?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Angelica Chaves',
    phone: '+6598810098',
    email: 'michael.smith@randommail.com',
    initials: 'AC',
  },
  {
    id: '2',
    phone: '+6598810098',
    email: 'jessica.brown@samplemail.com',
  },
  {
    id: '3',
    email: 'sophia.jones@webmail.com',
  },
  {
    id: '4',
    name: 'Andreas El Paradiso',
    phone: '+6598810098',
    email: 'liam.williams@fakemail.com',
    initials: 'AE',
  },
  {
    id: '5',
    phone: '+6598810098',
    email: 'olivia.davis@tempmail.com',
  },
  {
    id: '6',
    name: 'Angelica Chaves',
    phone: '+6598810098',
    email: 'elijah.rodriguez@mockemail.com',
    initials: 'AC',
  },
];

interface CustomerSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect?: (customer: Customer) => void;
}

export default function CustomerSheet({
  visible,
  onClose,
  onSelect,
}: CustomerSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset selection when sheet opens
  useEffect(() => {
    if (visible) {
      setSelectedId(null);
      setSearchQuery('');
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.3,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, translateY, backdropOpacity]);

  const handleSelect = (customer: Customer) => {
    setSelectedId(customer.id);
    onSelect?.(customer);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleAddNew = () => {
    // Placeholder for add new customer functionality
    console.log('Add new customer');
  };

  // Filter customers based on search query
  const filteredCustomers = mockCustomers.filter((customer) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      customer.name?.toLowerCase().includes(query) ||
      customer.email?.toLowerCase().includes(query) ||
      customer.phone?.includes(query)
    );
  });

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Custom Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.headerButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select customers</Text>
            <TouchableOpacity onPress={handleAddNew} style={styles.headerButton}>
              <Text style={styles.addNewText}>Add new</Text>
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <SearchIcon size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by email or name"
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Customer List */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {filteredCustomers.map((customer) => (
              <CustomerItem
                key={customer.id}
                name={customer.name}
                phone={customer.phone}
                email={customer.email}
                initials={customer.initials}
                selected={customer.id === selectedId}
                onPress={() => handleSelect(customer)}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: SCREEN_HEIGHT - SHEET_TOP_OFFSET,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  handle: {
    width: 52,
    height: 6,
    backgroundColor: colors.grey200,
    borderRadius: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerButton: {
    minWidth: 60,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  addNewText: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primaryBlue,
    textAlign: 'right',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey100,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: colors.textPrimary,
    padding: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
