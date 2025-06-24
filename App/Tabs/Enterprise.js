import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';

const categories = [
  { label: 'Өмгөөлөгч', value: 'law' },
  { label: 'Хоолны газар', value: 'restaurant' },
  { label: 'Хүүхэд харах', value: 'childcare' },
  { label: 'Караоке', value: 'karaoke' },
];

const locations = [
  { label: 'Сөүл', value: 'seoul' },
  { label: 'Инчон', value: 'incheon' },
  { label: 'Бусан', value: 'busan' },
];

const DATA = [
  {
    id: '1',
    name: 'Өмгөөлөгч & хуулийн зөвлөгөө',
    phone: '010-5636-5933',
    address: 'Сөүл хот, 234-7',
    discount: '5%',
    category: 'law',
    location: 'seoul',
    image: require('../Assets/Images/law.jpg'),
  },
  {
    id: '2',
    name: 'Наран зоог',
    phone: '010-5636-5933',
    address: 'Инчон, 123-4',
    discount: '10%',
    category: 'restaurant',
    location: 'incheon',
    image: require('../Assets/Images/restaurant.jpg'),
  },
  {
    id: '3',
    name: 'Хүүхэд харах үйлчилгээ',
    phone: '010-5636-5933',
    address: 'Бусан, 56-1',
    discount: '5%',
    category: 'childcare',
    location: 'busan',
    image: require('../Assets/Images/childcare.jpg'),
  },
];

export default function Enterprise({route, navigation }) {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [modalVisible, setModalVisible] = useState(null); // 'category' | 'location' | null

  const filteredData = DATA.filter(item => {
    return (
      (!categoryFilter || item.category === categoryFilter) &&
      (!locationFilter || item.location === locationFilter)
    );
  });

  const handleCall = phone => Linking.openURL(`tel:${phone}`);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Image source={item.image} style={styles.cardImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <TouchableOpacity onPress={() => handleCall(item.phone)}>
              <Ionicons name="call-outline" size={16} color="#333" style={{ marginRight: 4 }} />
              </TouchableOpacity>
              <Text>{item.phone}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Ionicons name="location-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            <Text style={{ flex: 1 }}>{item.address}</Text>
            <TouchableOpacity
              onPress={() => Clipboard.setString(item.address)}
              style={{ marginLeft: 4 }}>
              <Ionicons name="copy-outline" size={16} color="#388df5" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Ionicons name="information-circle-outline" size={16} color="#333" style={{ marginRight: 4 }} />
              <Text>Хөнгөлөлт: {item.discount}</Text>
          </View>
          
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Монгол байгууллага</Text>

        <View style={styles.topIcons}>
          <TouchableOpacity onPress={() => console.log('Search pressed')} style={styles.icon}>
            <Ionicons name="search-outline" size={22} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('More pressed')}>
            <Ionicons name="ellipsis-vertical" size={22} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.bigCard} source={require('../Assets/Images/advertise.jpg')} />

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => {
          setCategoryFilter(null);
          setLocationFilter(null);
        }}>
          <Text style={styles.filterText}>Бүгд</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible('category')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="filter-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Аж ахуй нэгж</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible('location')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="location-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            <Text style={styles.filterText}>Байршил</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal for Category */}
      <Modal visible={modalVisible === 'category'} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(null)}
        >
          <View style={styles.modalBox}>
            {categories.map(cat => (
              <TouchableOpacity key={cat.value} onPress={() => {
                setCategoryFilter(cat.value);
                setModalVisible(null);
              }}>
                <Text style={styles.modalItem}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal for Location */}
      <Modal visible={modalVisible === 'location'} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(null)}
        >
          <View style={styles.modalBox}>
            {locations.map(loc => (
              <TouchableOpacity key={loc.value} onPress={() => {
                setLocationFilter(loc.value);
                setModalVisible(null);
              }}>
                <Text style={styles.modalItem}>{loc.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff', marginTop: 48 },
  topTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, marginTop: 10, alignSelf: 'center' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  topIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  icon: {
    marginRight: 8,
  },
  bigCard: {
    width: 338,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center"
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  filterBtn: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  filterText: {
    fontWeight: '500',
  },
  card: {
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  link: { color: '#0085FF', marginTop: 6 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    width: 250,
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 5,
  },
  modalItem: {
    fontSize: 16,
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});