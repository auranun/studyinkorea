import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function FreelancerProfileCreation() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [field, setField] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    const profile = {
      image,
      name,
      profession,
      field,
      experience,
      location,
      contact,
    };
    console.log('Profile submitted:', profile);

    Alert.alert(
      'Амжилттай',
      'Таны мэдээлэл амжилттай бүртгэгдлээ. Таны мэдээллийг шалгаад эргэн хариу өгнө.',
      [
        {
          text: 'Ойлголоо',
          onPress: () => navigation.navigate('Services'),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>
      <Text style={styles.header}>Freelancer профайл үүсгэх</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Цээж зураг оруулах</Text>
        )}
      </TouchableOpacity>

      <TextInput placeholder="Овог Нэр" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Мэргэжил" style={styles.input} value={profession} onChangeText={setProfession} />
      <TextInput placeholder="Aль салбарт үйлчилгээ үзүүлэх" style={styles.input} value={field} onChangeText={setField} />
      <TextInput placeholder="Туршлага (жилээр)" style={styles.input} value={experience} onChangeText={setExperience} keyboardType="numeric" />
      <TextInput placeholder="Байршил (хотын нэр англиар)" style={styles.input} value={location} onChangeText={setLocation} />
      <TextInput placeholder="Холбогдох дугаар" style={styles.input} value={contact} onChangeText={setContact} keyboardType="phone-pad" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Хадгалах</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    color: '#aaa',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});