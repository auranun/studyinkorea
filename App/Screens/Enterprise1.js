import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Modal,
  Image,
  StatusBar,
  Platform,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import rawData from '../Assets/Data/enterpriseData.json';

const categories = [
  { label: 'Хуулийн зөвлөгөө', value: 'law' },
  { label: 'Зоогийн газар', value: 'restaurant' },
  { label: 'Махны дэлгүүр', value: 'mart' },
  { label: 'Караоке', value: 'karaoke' },
];

const locations = [
  { label: 'Seoul', value: 'seoul' },
{ label: 'Incheon', value: 'incheon' },
{ label: 'Busan', value: 'busan' },
{ label: 'Daegu', value: 'daegu' },
{ label: 'Daejeon', value: 'daejeon' },
{ label: 'Gwangju', value: 'gwangju' },
{ label: 'Ulsan', value: 'ulsan' },
{ label: 'Sejong', value: 'sejong' },
{ label: 'Jeju City', value: 'jeju' },
{ label: 'Suwon', value: 'suwon' },
{ label: 'Goyang', value: 'goyang' },
{ label: 'Yongin', value: 'yongin' },
{ label: 'Seongnam', value: 'seongnam' },
{ label: 'Ansan', value: 'ansan' },
{ label: 'Hwaseong', value: 'hwaseong' },
{ label: 'Pyeongtaek', value: 'pyeongtaek' },
{ label: 'Gimhae', value: 'gimhae' },
{ label: 'Changwon', value: 'changwon' },
{ label: 'Cheongju', value: 'cheongju' },
{ label: 'Pohang', value: 'pohang' },
{ label: 'Chuncheon', value: 'chuncheon' },
{ label: 'Gangneung', value: 'gangneung' },
{ label: 'Jeonju', value: 'jeonju' },
{ label: 'Mokpo', value: 'mokpo' },
{ label: 'Suncheon', value: 'suncheon' }
];

const DATA = JSON.parse(JSON.stringify(rawData));

export default function Enterprise({route, navigation }) {
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [modalVisible, setModalVisible] = useState(null); // 'category' | 'location' | null
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const filteredData = DATA.filter(item => {
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesLocation = !locationFilter || item.location === locationFilter;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const handleCall = phone => Linking.openURL(`tel:${phone}`);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Image
        source={
          item.image.includes('law')
            ? require('../Assets/Images/law.jpg')
            : item.image.includes('restaurant')
            ? require('../Assets/Images/restaurant.jpg')
            : require('../Assets/Images/childcare.jpg')
        }
        style={styles.cardImageTop}
      />
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <TouchableOpacity onPress={() => handleCall(item.phone)}>
            <Ionicons name="call-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            </TouchableOpacity>
            <Text>{item.phone}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Ionicons name="location-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            <Text style={{ flex: 1 }}>{item.address}</Text>
            <TouchableOpacity
              onPress={() => Clipboard.setString(item.address)}
              style={{ marginLeft: 4 }}>
              <Ionicons name="copy-outline" size={16} color="#388df5" />
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="information-circle-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            <Text>Хөнгөлөлт: {item.discount}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
      <View style={styles.topBar}>
        {/*<TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>*/}
        <Text style={styles.topTitle}>Монгол үйлчилгээний газар</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 }}>
          {isSearching ? (
              <TouchableOpacity onPress={() => { setIsSearching(false); setSearchQuery(''); }}>
                <Ionicons name="close" size={22} style={{ marginRight: 10 }}/>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsSearching(true)}>
                <Ionicons name="search-outline" size={22} />
              </TouchableOpacity>
            )}
          <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
            <Ionicons name="ellipsis-vertical" size={20} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      {isSearching && (
          <View style={styles.searchBarWrapper}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Хайлт..."
                placeholderTextColor="#aaa"
                style={styles.searchInput}
                autoFocus
              />
          </View>)}
      {showMenu && (
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
          }}>
            <View style={styles.showMenu}>
              <TouchableOpacity onPress={() => {
                setShowMenu(false);
                navigation.navigate('EnterpriseCreation');
              }}>
                <Text style={{ fontSize: 14 }}> Байгууллагын профайл үүсгэх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
        
      <ScrollView style={{padding: 10}}>
        <Image style={styles.bigCard} source={require('/Users/naranundra/Projects/studyinkorea/public/Images/ads_cover.png')} />

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
              <Text style={styles.filterText}>Категори</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterBtn} onPress={() => setModalVisible('location')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location-outline" size={16} color="#333" style={{ marginRight: 4 }} />
              <Text style={styles.filterText}>Байршил</Text>
            </View>
          </TouchableOpacity>
        </View>

        {filteredData.map((item) => (
          <View key={item.id || item.name}>
            {renderItem({ item })}
          </View>
        ))}
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
    },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 55 : 44,
    backgroundColor: '#fff',
  },
  searchBarWrapper: {
    marginTop: 10,
    marginHorizontal: 8,
    marginBottom: 2,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  searchInput: {
    fontSize: 16,
    color: '#222',
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  searchResultCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchResultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  topTitle: { fontSize: 18, fontWeight: 'bold', paddingLeft: 20, marginBottom: 12 },
  bigCard: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center", 
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
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  cardImageTop: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 10,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 6 },
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
  showMenu: {
    position: 'absolute',
    top: 75,
    right: 25,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    zIndex: 100,
  },
});