import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../configs/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert('Алдаа', 'Бүх талбарыг бөглөнө үү');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Алдаа', 'Нууц үг таарахгүй байна');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = {
        uid: user.uid,
        name: name,
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(firestore, 'Users', user.uid), userDoc);
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userEmail', user.email);

      Alert.alert('Амжилттай', 'Бүртгэл үүсгэлээ');
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Алдаа', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          source={require('../Assets/Images/background2.jpeg')}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.topBar}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Бүртгэл үүсгэх</Text>
            </View>

            <Text style={styles.title}>MOKO таньд туслахад {'\n'} үргэлж бэлэн байна</Text>

            <TextInput
              style={styles.input}
              placeholder="Нэр"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Имэйл"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Нууц үг"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TextInput
              style={styles.input}
              placeholder="Нууц үг давтах"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Бүртгүүлэх</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  container: { flex: 1, paddingHorizontal: 10, paddingTop: 60 },
  backButton: { position: 'absolute', left: 16, top: '50%', transform: [{ translateY: -12 }], padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', marginTop: '30%' },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginBottom: 20,
    width: '85%',
    fontSize: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#005BBB',
    paddingVertical: 20,
    borderRadius: 30,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  topBar: { position: 'relative', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, marginBottom: 10, flexDirection: 'row', gap: 10 },
});