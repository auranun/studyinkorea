import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, StatusBar, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import rawData from '../Assets/Data/freelancers.json';

const DATA = JSON.parse(JSON.stringify(rawData));

export default function Services({ navigation }) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
      <View style={styles.container}>  
      <StatusBar barStyle="dark-content" backgroundColor="#F9F9F9" />
          <View style={styles.topBar}>
            {/*<TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>*/}
            <Text style={styles.topTitle}>Мэргэжлийн үйлчилгээ</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 }}>
              <TouchableOpacity onPress={() => console.log('Search pressed')}>
                <Ionicons name="search-outline" size={22} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <Ionicons name="ellipsis-vertical" size={20} style={{marginRight: 10}}  />
              </TouchableOpacity>
            </View>
          </View>
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
                          navigation.navigate('ProfileCreation');
                        }}>
                          <Text style={{ fontSize: 14 }}>Freelancer профайл үүсгэх</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
        <ScrollView style={{paddingHorizontal: 16}}>

          <Text style={styles.subtitle}>
            Олон салбарын мэргэжилтнүүдээс өөрийн хэрэгцээ шаардлагад нийцсэн үйлчилгээг сонгон авах болон өөрийн профайлыг үүсгэн өөрийн мэдлэг чадвараараа бусдад туслан нэмэлт орлого олох боломжтой.
          </Text>

          {Object.entries(DATA).map(([category, list]) => (
            <View key={category}>
              <Text style={styles.sectionTitle}>{category}</Text>
              <FlatList
                data={list}
                horizontal
                keyExtractor={(item, index) => `${item.id}-${index}`}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 10}}>
                      <Image source={require('../Assets/Images/user1.png')} style={styles.avatar} />
                      <View style={styles.whiteBox}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.titleText}>{item.title}</Text>
                      </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.titleText}>Салбар: {item.field}</Text>
                        <Text style={styles.titleText}>Туршлага: {item.experience}</Text>
                      </View>
                      

                    <View style={styles.whiteBox}>
                      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Ionicons name="location-outline" size={14} color="#555" style={{marginRight: 4}} />
                        <Text style={styles.titleText}>{item.location}</Text>
                        <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat', { user: item })}>
                              <Ionicons name="chatbubble-ellipses-outline" size={14} color="#fff" />
                              <Text style={styles.badgeText}>Call</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          ))}
        </ScrollView>
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
  topTitle: { fontSize: 18, fontWeight: 'bold', paddingLeft: 20, marginBottom: 12 },
  subtitle: { fontSize: 14, color: '#555', },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16, marginTop: 16 },
  card: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    paddingBottom: 16,
    marginRight: 12,
    elevation: 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 28,
  },
  infoBox: {
    backgroundColor: 'fff',
    borderRadius: 20,
    maxWidth: '100%' ,
    textAlign: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    flexDirection: 'row',
  },
  whiteBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  name: { fontWeight: '600', fontSize: 13,  },
  titleText: { fontSize: 11, color: '#444' },
  chatButton: {
    backgroundColor: '#3A6AE4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 22,
    gap: 6,
    marginLeft: 8,
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