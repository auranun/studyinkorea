import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function UserProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');


  const handleEditProfile = () => {
    // Navigate to Edit Profile screen or open modal
    console.log('Edit Profile Pressed');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      console.log('User name from storage:', storedName);
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedName) setUserName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    fetchUserData();
  }, []);

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../Assets/Images/user.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{userName || 'Хэрэглэгчийн нэр'}</Text>
        <Text style={styles.email}>{email || 'username@example.com'}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>ПРОФАЙЛ ЗАСАХ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Тохиргоо</Text>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="bookmark-outline" size={20} color="#333" style={styles.itemIcon} />
          <Text style={styles.itemText}>Хадгалсан блог</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="ticket-outline" size={20} color="#333" style={styles.itemIcon} />
          <Text style={styles.itemText}>Миний тасалбарууд</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="card-outline" size={20} color="#333" style={styles.itemIcon} />
          <Text style={styles.itemText}>Төлбөрийн түүх</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="globe-outline" size={20} color="#333" style={styles.itemIcon} />
          <Text style={styles.itemText}>Хэлний тохиргоо</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Login')}>
          <Ionicons name="log-out-outline" size={20} color="#333" style={styles.itemIcon} />
          <Text style={styles.itemText}>Гарах</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 8,
    marginTop: 32
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#555',
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  itemIcon: {
    marginRight: 16,
  },
  itemText: {
    fontSize: 18,
  },
});