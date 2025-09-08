import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BlogDetail({ route, navigation }) {
  const { blogId } = route.params;
  const [blog, setBlog] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogRef = doc(db, 'Blogs', blogId);
      const snapshot = await getDoc(blogRef);
      if (snapshot.exists()) {
        setBlog(snapshot.data());
      } 
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    const checkBookmark = async () => {
      const saved = await AsyncStorage.getItem(`bookmark_${blogId}`);
      setIsBookmarked(!!saved);
    };
    checkBookmark();
  }, [blogId]);

  const toggleBookmark = async () => {
    if (isBookmarked) {
      await AsyncStorage.removeItem(`bookmark_${blogId}`);
    } else {
      await AsyncStorage.setItem(`bookmark_${blogId}`, JSON.stringify(blog));
    }
    setIsBookmarked(!isBookmarked);
  };

  if (!blog) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Блог мэдээлэл</Text>
        <TouchableOpacity onPress={toggleBookmark} style={{ marginLeft: 'auto' }}>
          <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{blog.title}</Text>
        {blog.image ? (
          <Image source={{ uri: blog.image }} style={styles.image} />
        ) : null}
        {/*<Text style={styles.benefit}>{blog.benefit}</Text>*/}
        <Text style={styles.content}>{blog.info}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff', paddingTop: 12},
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
    marginLeft: 10
  },
  benefit: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
    marginLeft: 10
  },
  content: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333',
    paddingHorizontal: 2,
    paddingTop: 8,
    marginLeft: 8,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
});