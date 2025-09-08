import React, { useState } from 'react';
import { useEffect } from 'react';
import { View,
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
  TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import Search from '../Components/Search';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import { firestore } from '../configs/firebaseConfig';

const categories = [
  "Худалдаа үйлчилгээ",
  "Хоолны газар",
  "Эрүүл мэнд",
  "Боловсрол",
  "Тээвэр",
  "Технологи",
  "Санхүү",
  "Бусад"
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

export default function Enterprise({route, navigation }) {
  const [query, setQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [modalVisible, setModalVisible] = useState(null); // 'category' эсвэл 'location'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [enterprises, setEnterprises] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);
  

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
    );
  };

  // Firestore-с мэдээлэл татах
  useEffect(() => {
    const fetchEnterprises = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Enterprises'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEnterprises(data);
      } catch (error) {
        console.error('Error fetching enterprises: ', error);
      }
    };

    fetchEnterprises();
  }, []);

  // Category-д шүүх
  const filteredEnterprises = enterprises.filter((ent) =>
    (!selectedCategory || ent.category === selectedCategory) &&
    (!query || ent.name?.toLowerCase().includes(query.toLowerCase()))
  );

  const handleCall = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return (
    <View style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
          <View style={styles.topBar}>
            {/*<TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>*/}
            <Text style={styles.topTitle}>Монгол үйлчилгээний газар</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 }}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Ionicons name="ellipsis-vertical" size={20} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
        <Search
        placeholder="Байгууллага хайх..."
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
        style={{ marginHorizontal: 16, marginBottom: 12 }}
        autoFocus={true}
      />

      {showMenu && (
        <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
          <View style={styles.showMenu}>
            <TouchableOpacity onPress={() => {
              setShowMenu(false);
              navigation.navigate('EnterpriseCreation');
            }}>
              <Text style={{ fontSize: 14 }}>Байгууллагын профайл үүсгэх</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}

      <ScrollView
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, columnGap: 10, rowGap: 10, paddingBottom: 150 }}>
        <Image style={styles.bigCard} source={require('/Users/naranundra/Projects/studyinkorea/public/Images/ads_cover.png')} />
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterBtn} onPress={() => {
            setSelectedCategory(null);
            setModalVisible(null);
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

        {filteredEnterprises.map(ent => (
          <View key={ent.id} style={styles.card}>
            {ent.images ? (
              <Image source={{ uri: ent.images?.url || ent.images}} style={styles.cardImage} />
            ) : (
              <Image source={require('/Users/naranundra/Projects/studyinkorea/public/Images/ent1.png')} style={styles.cardImage} />
            )}
            <View style={styles.cardDetails}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.cardTitle}>{ent.name} </Text>
                  <Text style={styles.cardLocation}>({ent.city})</Text>
                </View>
                <TouchableOpacity onPress={() => toggleBookmark(ent.id)}>
                  <Ionicons
                    name={bookmarked.includes(ent.id) ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color={bookmarked.includes(ent.id) ? '#1d5fe2ff' : '#333'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardFeature}>{ent.feature}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="location-outline" size={18} color="#888" style={{ marginRight: 4 }} />
                <Text style={styles.cardText}> {ent.address || 'Байршил тодорхойгүй'}</Text>
                {ent.address && (
                  <TouchableOpacity onPress={() => Clipboard.setStringAsync(ent.address)}>
                    <Ionicons name="copy-outline" size={16} color="#2c5df0ff" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Ionicons name="time-outline" size={17} color="#888" style={{ marginRight: 4 }} />
  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} onPress={() => setExpandedScheduleId(expandedScheduleId === ent.id ? null : ent.id)}>
    <Text style={styles.cardText}>
      {(() => {
        const today = new Date().toLocaleString('en-US', { weekday: 'long' });
        const todaySchedule = ent.schedule?.[today];
        if (todaySchedule) {
          if (todaySchedule.holiday) {
            return 'Өнөөдөр амарч байна';
          } else if (todaySchedule.open && todaySchedule.close) {
            return `Ажиллаж байна: ${todaySchedule.open} - ${todaySchedule.close}`;
          }
        }
        return 'Өнөөдөр амарч байна';
      })()}
    </Text>
    <Ionicons name={expandedScheduleId === ent.id ? 'chevron-up-outline' : 'chevron-down-outline'} size={18} color="#888" style={{ marginLeft: 6 }} />
  </TouchableOpacity>
</View>
{expandedScheduleId === ent.id && (
  <View style={{ marginLeft: 22, marginTop: 4 }}>
    {Object.entries(ent.schedule || {}).map(([day, sch], idx) => (
      <Text key={idx} style={styles.cardText}>
        {day}: {sch.holiday ? 'Амралтын өдөр' : sch.open && sch.close ? `${sch.open} - ${sch.close}` : 'Тодорхойгүй'}
      </Text>
    ))}
  </View>
)}
              <View style={styles.cardFooter}>
                {/*<TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('EnterpriseDetail', { enterpriseId: ent.id })}>
                  <Text style={styles.cardButtonText}>Дэлгэрэнгүй</Text>
                </TouchableOpacity>*/}
                <TouchableOpacity style={[styles.cardButton, { backgroundColor:'#1d5fe2ff' }]} onPress={() => handleCall(ent.phone)}>
                  <Text style={styles.cardButtonText}>Захиалга өгөх</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {modalVisible === 'category' && (
        <Modal transparent animationType="fade" visible={true} onRequestClose={() => setModalVisible(null)}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
            <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', alignItems:'center' }}>
              <View style={{ width:'70%', maxHeight:'60%', backgroundColor:'#fff', borderRadius:10, padding:20 }}>
                <ScrollView>
                  {categories.map((cat, index) => (
                    <TouchableOpacity key={index} onPress={() => { setSelectedCategory(cat); setModalVisible(null); }} style={{ paddingVertical: 10 }}>
                      <Text style={{ fontSize:16 }}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      {modalVisible === 'location' && (
        <Modal transparent animationType="fade" visible={true} onRequestClose={() => setModalVisible(null)}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(null)}>
            <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', alignItems:'center' }}>
              <View style={{ width:'70%', maxHeight:'60%', backgroundColor:'#fff', borderRadius:10, padding:20 }}>
                <ScrollView>
                  {locations.map((loc, index) => (
                    <TouchableOpacity key={index} onPress={() => { setSelectedCategory(loc.value); setModalVisible(null); }} style={{ paddingVertical: 10 }}>
                      <Text style={{ fontSize:16 }}>{loc.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

    </View>
  </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topTitle: { fontSize: 18, fontWeight: 'bold', paddingLeft: 20, marginBottom: 12 },
  topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 55 : 44,
      backgroundColor: '#fff',
    },
  showMenu: {
    position: 'absolute',
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
  bigCard: {
    width: '100%',
    height: 110,
    borderRadius: 10,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width:0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardDetails: {
    padding: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardFeature: { fontSize: 12, color: '#666', marginTop: 4, marginBottom: 6 },
  cardText: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'flex-end' },
  cardButton: {
    backgroundColor: '#2196f3',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  cardButtonText: { color: '#fff', fontSize: 14 },

});