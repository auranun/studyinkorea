import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DATA = {
  "Эмнэлгийн үйлчилгээ": [
    {
      id: 'hospital-1',
      name: 'Отгобаяр Наран-Ундраа',
      title: 'Software • engineer',
      field: 'Гоо сайхны эмнэлэг, эмэгтэйчүүдийн эмнэлэг, мэс заслын эмнэлэг',
      experience: '4 жил',
      hours: 'Mon - Sat / 9AM - 4PM',
      image: require('../Assets/Images/user.png'),
    },
    {
      id: 'hospital-2',
      name: 'Отгобаяр Наран-Ундраа',
      title: 'Software • engineer',
      field: 'Гоо сайхны эмнэлэг, эмэгтэйчүүдийн эмнэлэг, мэс заслын эмнэлэг',
      experience: '4 жил',
      hours: 'Mon - Sat / 9AM - 4PM',
      image: require('../Assets/Images/user.png'),
    },
  ],
  "Хууль зүйн үйлчилгээ": [
    {
      id: 'law-1',
      name: 'Отгобаяр Наран-Ундраа',
      title: 'Software • engineer',
      field: 'Хууль, виз, гэрээ, хөдөлмөрийн асуудал',
      experience: '4 жил',
      hours: 'Mon - Sat / 9AM - 4PM',
      image: require('../Assets/Images/user.png'),
    },
    {
      id: 'law-2',
      name: 'Отгобаяр Наран-Ундраа',
      title: 'Software • engineer',
      field: 'Хууль, виз, гэрээ, хөдөлмөрийн асуудал',
      experience: '4 жил',
      hours: 'Mon - Sat / 9AM - 4PM',
      image: require('../Assets/Images/user.png'),
    },
  ],
  
  "Хурал зөвлөгөөний албаны орчуулга": [
    {
      id: 'event-1',
      name: 'Отгобаяр Наран-Ундраа',
      title: 'Software • engineer',
      field: 'Хурал, уулзалт, PT танилцуулга орчуулга',
      experience: '4 жил',
      hours: 'Mon - Sat / 9AM - 4PM',
      image: require('../Assets/Images/user.png'),
    },
    {
      id:'event-2',
      name: 'Отгобаяр Наран-Ундраа',
      title: 'Software • engineer',
      field: 'Хурал, уулзалт, PT танилцуулга орчуулга',
      experience: '4 жил',
      hours: 'Mon - Sat / 9AM - 4PM',
      image: require('../Assets/Images/user.png'),
    },
  ],
};

export default function Services({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Go back button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Орчуулгын үйлчилгээ</Text>
        <Ionicons name="ellipsis-vertical" size={20} />
      </View>

      <Text style={styles.subtitle}>
        Бүх төрлийн орчуулгын үйлчилгээг нэг дороос өөрийн хэрэгцээ шаардлагад тохируулан сонгон авах боломжтой.
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
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 6}}>
                  <Image source={item.image} style={styles.avatar} />
                  <View style={styles.infoBox}>
                    <Text style={styles.field}>Салбар: {item.field}</Text>
                  </View>
                </View>

                <View style={styles.badge}>
                  <Ionicons name="time-outline" size={14} color="#fff" style={{marginRight: 4}} />
                  <Text style={styles.badgeText}>{item.experience}</Text>
                </View>

                <View style={styles.whiteBox}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>

                <View style={styles.whiteBox}>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="calendar-outline" size={14} color="#555" style={{marginRight: 4}} />
                    <Text style={[styles.metaText, {color: '#555'}]}>{item.hours}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', padding: 20, marginTop: 48 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#555' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16, marginTop: 16 },
  card: {
    width: 220,
    backgroundColor: '#DDE7FF',
    borderRadius: 20,
    padding: 12,
    paddingBottom: 16,
    marginRight: 12,
    elevation: 3,
    alignItems: 'center',
    
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 28,
    marginRight: 8,
  },
  infoBox: {
    backgroundColor: '#2F73FF',
    padding: 10,
    borderRadius: 20,
    marginBottom: 0,
    maxWidth: 145,
    textAlign: 'center',
    justifyContent: 'center',
  },
  field: {
    color: '#fff',
    fontSize: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F73FF',
    borderRadius: 20,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 4,
    marginTop: 4
  },
  name: { fontWeight: '600', fontSize: 13,  },
  titleText: { fontSize: 11, color: '#444' },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#333',
  },
});