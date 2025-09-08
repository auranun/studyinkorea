import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../configs/firebaseConfig';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    };
    loadStoredCredentials();
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: '350760981381-4qn9paqrfkd7tijqghncoj0df9m9m70c.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.replace('MainTabs');
        })
        .catch((err) => alert(err.message));
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp'); 
  };

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        if (rememberMe) {
          await AsyncStorage.setItem('userEmail', email);
          await AsyncStorage.setItem('userPassword', password);
        } else {
          await AsyncStorage.removeItem('userEmail');
          await AsyncStorage.removeItem('userPassword');
        }
        navigation.replace('MainTabs');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            source={require('../Assets/Images/login1.png')}
            style={styles.headerImage}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>Гадаад дахь{'\n'}амьдралын хөтөч</Text>
            <TextInput
              placeholder="Имэйл хаяг"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Нууц үг"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 10, justifyContent: 'center', marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#999',
                  backgroundColor: rememberMe ? '#0085FF' : 'transparent',
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {rememberMe && <AntDesign name="check" size={10} color="#fff" />}
              </TouchableOpacity>
              <Text style={{ fontSize: 12, color: '#333' }}>Нэвтрэх мэдээллийг хадгалах</Text>
            </View>
            
            <Pressable onPress={handleEmailLogin} style={styles.loginButton}>
                <LinearGradient
                  colors={['#0085FF', '#005099']}
                  style={styles.authGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>Нэвтрэх</Text>
                </LinearGradient>
            </Pressable>
            {/*
            <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
                <AntDesign name="google" size={20} color="#333" style={{ }} />
            </Pressable> 
            */ }
            <Pressable onPress={handleSignUp} style={styles.signUpButton}>
                  <LinearGradient
                  colors={['#ddd', '#f2f2f2']}
                  style={styles.authGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Text style={{fontWeight: 'bold'}}>Бүртгүүлэх</Text>
                </LinearGradient>
            </Pressable>
            <Text style={styles.versionText}>Хувилбар: {Constants.expoConfig?.version || 'Тодорхойгүй'}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  headerImage: {
    width: '100%',
    height: '34%',
    resizeMode: 'cover',
    marginBottom: -30
  },
  bottomContainer: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: 'center',
    marginTop: -30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 34,
    marginBottom: '10%',
  },
  versionText: {
  fontSize: 12,
  color: '#888',
  textAlign: 'center',
  marginTop: 10,
  },
  googleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    marginHorizontal: 4,
  },
  loginButton: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    width: '60%',
    marginBottom: 40,
  },
  signUpButton: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    width: '60%',
    marginBottom: 30,
  },
  authGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderRadius: 30,
    width: '100%',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15
  },
  input: {
    backgroundColor: '#fff',
    width: '85%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});