import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

const DUMMY_POSTS = [
  {
    id: '1',
    title: 'Welcome to the Community!',
    content: 'Introduce yourself and meet other students.',
  },
  {
    id: '2',
    title: 'Study Tips',
    content: 'Share your best tips for studying in Korea.',
  },
  {
    id: '3',
    title: 'Events',
    content: 'Upcoming student events and meetups.',
  },
];

export default function Community() {
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Community</Text>
      <FlatList
        data={DUMMY_POSTS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    alignSelf: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  postContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  postContent: {
    fontSize: 16,
    color: '#444',
  },
});