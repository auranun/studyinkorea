import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Login() {
  const navigation = useNavigation();

  const handleGoogleLogin = () => {
    // Google 로그인 처리 추가 (추후 구현)
    navigation.navigate('Home');
  };

  const handleGuestStart = () => {
    navigation.navigate('MainTabs'); // <== 여기서 Home으로 이동합니다.
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../Assets/Images/login1.png')} // 경복궁 예시 이미지
        style={styles.headerImage}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Гадаад дахь{'\n'}амьдралын хөтөч</Text>

        <TouchableOpacity onPress={handleGuestStart}>
          <LinearGradient
            colors={['#0085FF', '#005099']}
            style={styles.guestButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Бүртгэлгүйгээр эхлэх</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
          <AntDesign name="google" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Login/Signup</Text>
        <Text style={{alignSelf: 'flex-end', alignSelf: 'center'}}>Copyright 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerImage: {
    width: '100%',
    height: '25%',
    resizeMode: 'cover',
  },
  bottomContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 150
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 16,
    paddingHorizontal: 51,
    borderRadius: 30,
    marginBottom: 20,
  },
  guestButton: {
    paddingVertical: 16,
    paddingHorizontal: 51,
    borderRadius: 30,
    marginBottom: 16,
    marginTop: 100
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});