import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../configs/firebaseConfig'; // Make sure this file exists

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [blogData, setBlogData] = useState({});
  const [activeTab, setActiveTab] = useState('Бүгд');

  const categoryMap = {
    'Бүгд': null,
    'Хэлний бэлтгэл': ['Хэлээ сайжруулах', 'Суралцахад хэрэгтэй зөвлөмж'],
    'Бакалавр': ['Суралцахад хэрэгтэй зөвлөмж'],
    'Магистр': ['Суралцахад хэрэгтэй зөвлөмж'],
    'Аяллын виз': ['Визний тухай', 'Солонгост ажиллах']
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'Blogs'));
      const groupedData = {};
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (!groupedData[data.category]) {
          groupedData[data.category] = [];
        }
        groupedData[data.category].push({ id: doc.id, ...data });
      });
      setBlogData(groupedData);
    };
    fetchBlogData();
  }, []);

  const allBlogs = Object.values(blogData).flat();

  const filteredData = allBlogs.filter(item =>
    (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.benefit && item.benefit.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      {/*Header + Title */}
      <LinearGradient
        colors={['#005099', '#0085FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.headerWrapper}
      >
        <View style={styles.headerRow}>
          <View style={styles.header}>
            <Image source={require('../Assets/Images/user.png')} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Сайн уу,</Text>
              <Text style={styles.username}>Naran Undraa</Text>
            </View>
          </View>
          <View style={styles.iconRow}>
            {isSearching ? (
              <TouchableOpacity onPress={() => { setIsSearching(false); setSearchQuery(''); }} style={styles.iconButton}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsSearching(true)} style={styles.iconButton}>
                <Ionicons name="search" size={24} color="#fff" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.iconButton}>
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>MOKO илүү хялбар болгоно</Text>
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
          </View>
        )}
      </LinearGradient>

      {/* Search Mode */}
      {isSearching ? (
        <View style={{ flex: 1 }}>
          {filteredData.length === 0 ? (
            <Text style={{ margin: 20, color: '#888', textAlign: 'center' }}>Үр дүн олдсонгүй</Text>
          ) : (
            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              contentContainerStyle={{ padding: 16 }}
              renderItem={({ item }) => (
                <View style={styles.searchResultCard}>
                  <Image style={styles.searchResultImage} source={item.image} />
                  <View style={{ flex: 1 }}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardTitle}>{item.title}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardText}>{item.benefit}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      ) : (
        <ScrollView>
          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Бүгд' && styles.tabActive]}
              onPress={() => setActiveTab('Бүгд')}
            >
              <Text style={activeTab === 'Бүгд' ? styles.activeText : undefined}>Бүгд</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Хэлний бэлтгэл' && styles.tabActive]}
              onPress={() => setActiveTab('Хэлний бэлтгэл')}
            >
              <Text style={activeTab === 'Хэлний бэлтгэл' ? styles.activeText : undefined}>Хэлний бэлтгэл</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Бакалавр' && styles.tabActive]}
              onPress={() => setActiveTab('Бакалавр')}
            >
              <Text style={activeTab === 'Бакалавр' ? styles.activeText : undefined}>Бакалавр</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Магистр' && styles.tabActive]}
              onPress={() => setActiveTab('Магистр')}
            >
              <Text style={activeTab === 'Магистр' ? styles.activeText : undefined}>Магистр</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Аяллын виз' && styles.tabActive]}
              onPress={() => setActiveTab('Аяллын виз')}
            >
              <Text style={activeTab === 'Аяллын виз' ? styles.activeText : undefined}>Аяллын виз</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Card Sections */}
          <View style={styles.cardGroup}>
            <Image style={styles.bigCard} source={require('../Assets/Images/advertise.jpg')} />
          </View>

          {Object.keys(blogData)
            .filter(category => {
              const selectedCategories = categoryMap[activeTab];
              return !selectedCategories || selectedCategories.includes(category);
            })
            .map(category => (
              <View style={styles.cardGroup} key={category}>
                <Text style={styles.sectionTitle}>{category}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {blogData[category].map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.infoCard}
                      onPress={() => navigation.navigate('BlogDetail', { blogId: item.id })}
                    >
                      <Image style={styles.infoImage} source={{ uri: item.image }} />
                      <Text style={styles.cardTitle} numberOfLines={2}>{item.title || 'No Title'}</Text>
                      <Text style={styles.cardText} numberOfLines={2}>{item.benefit}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FB',
    flex: 1,
    marginTop: 48
  },
  searchBarWrapper: {
    marginTop: 12,
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
    flex: 1,
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
  headerWrapper: {
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  avatar: {
    width: 40, height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#fff',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  tabs: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tab: {
    backgroundColor: '#EEE',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#007AFF',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cardGroup: {
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 10
  },
  bigCard: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 10
  },
  infoCard: {
  width: screenWidth * 0.6, // өргөтгөж өгсөн
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 10,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
  marginRight: 12,
  justifyContent: 'flex-start',
},
infoImage: {
  width: '100%',
  height: 100,
  borderRadius: 8,
  marginBottom: 8
  },
cardTitle: {
  fontWeight: 'bold',
  fontSize: 15,
  marginBottom: 4,
  flexWrap: 'wrap',
  lineHeight: 20,
},
cardText: {
  fontSize: 13,
  color: '#666',
},
content: {
  fontSize: 16,
  lineHeight: 28,
  color: '#333',
  paddingHorizontal: 4,
  paddingTop: 8,
},
});