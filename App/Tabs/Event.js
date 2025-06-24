import React, { useState, useEffect } from 'react';
import { db } from '../configs/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Linking, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const today = new Date();

export default function EventScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchEventsFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Events'));
        const grouped = {};

        querySnapshot.forEach(doc => {
          const data = doc.data();
          const category = data.category;
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push({ id: doc.id, ...data });
        });

        const sectionsArray = Object.keys(grouped).map((category, index) => ({
          id: index.toString(),
          category,
          data: grouped[category],
        }));

        setSections(sectionsArray);
      } catch (error) {
        console.error('Error fetching Firestore events:', error);
      }
    };

    fetchEventsFromFirestore();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topBar}> 
        <Ionicons name="arrow-back" size={24} />
        <Text style={styles.title}>Сонирхолтой соёлын эвент</Text>
        <Ionicons name="ellipsis-vertical" size={20} />
      </View>

      {/* Today Card */}
      <View style={styles.todayCard}>
        <View style={styles.todayLeft}>
          <Text style={styles.todayWeekday}>{today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}</Text>
          <Text style={styles.todayNumber}>{today.getDate()}</Text>
          <Text style={styles.todayDate}>{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
        </View>
        <View style={styles.verticalSeparator} />
        <TouchableOpacity style={styles.todayRight} onPress={() => setCalendarVisible(true)}>
          <Ionicons name="calendar-outline" size={30} color="#6c757d" style={{ marginBottom: 8 }} />
          <Text style={styles.noEventText}>No more event today</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal visible={calendarVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '90%', alignItems: 'center' }}>
            <Calendar
              onDayPress={day => {
                setSelectedDate(day.dateString);
                setCalendarVisible(false);
              }}
              markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#0085FF' } } : {}}
            />
            <Button title="Close" onPress={() => setCalendarVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* 섹션별 이벤트 */}
      {sections.map(section => (
        <View key={section.id}>
          <Text style={styles.sectionTitle}>{section.category}</Text>
          <FlatList
            data={section.data}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.image && <Image source={item.image} style={styles.cardImage} />}
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDate}>{(item.date)}</Text>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => Linking.openURL(item.link)}
                >
                  <Text style={styles.actionText}>{item.type}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, marginTop: 48 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  todayCard: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 2, height: 4 },
    elevation: 3,
  },
  todayLeft: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  todayWeekday: {
    fontSize: 22,
    color: '#0085FF',
    marginBottom: 2,
    fontWeight: 700

  },
  todayNumber: {
    fontSize: 48,
    marginBottom: 4,
    fontWeight: 200,
  },
  todayDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  verticalSeparator: {
    width: 1,
    height: 70,
    backgroundColor: '#d1d5db',
    marginHorizontal: 24,
  },
  todayRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 16,
  },
  card: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 110,
    borderRadius: 8,
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  actionBtn: {
    backgroundColor: '#0085FF',
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});