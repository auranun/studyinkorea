import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const dummyData = [
  {
    id: '1',
    title: 'Дуудлага засах аргууд',
    description: '5 төрлийн арга',
    image: require('../Assets/Images/language1.png'),
  },
  {
    id: '2',
    title: 'Сонсгол сайжруулах сонирхолтой контент',
    description: 'Алдартай Youtube сувгууд',
    image: require('../Assets/Images/language2.png'),
  },
  {
    id: '3',
    title: 'Виз сунгуулах арга',
    description: '3 төрлийн арга, бичиг баримт',
    image: require('../Assets/Images/visa1.png'),
  },
  {
    id: '4',
    title: 'Ажиллах зөвшөөрөл авах',
    description: 'Бичиг баримт, шалгуур',
    image: require('../Assets/Images/visa2.png'),
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredData = dummyData.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Хайлт..."
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Үр дүн алга</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    borderRadius: 10,
  },
  image: {
    width: 60, height: 60, borderRadius: 8, marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  desc: {
    fontSize: 13,
    color: '#555',
  },
});