import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../configs/firebaseConfig'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';


const categories = [
  "Худалдаа үйлчилгээ",
  "Хоолны газар",
  "Эрүүл мэнд",
  "Боловсрол",
  "Тээвэр",
  "Технологи",
  "Санхүү",
  "Бусад"
];

const cities = [
  { label: 'Seoul', value: 'seoul' },
  { label: 'Uijeongbu', value: 'uijeongbu' },
{ label: 'Incheon', value: 'incheon' },
{ label: 'Busan', value: 'busan' },
{ label: 'Daegu', value: 'daegu' },
{ label: 'Daejeon', value: 'daejeon' },
{ label: 'Gwangju', value: 'gwangju' },
{ label: 'Ulsan', value: 'ulsan' },
{ label: 'Sejong', value: 'sejong' },
{ label: 'Jeju City', value: 'jeju' },
{ label: 'Suwon', value: 'suwon' },
{ label: 'Goyang', value: 'goyang' },
{ label: 'Yongin', value: 'yongin' },
{ label: 'Seongnam', value: 'seongnam' },
{ label: 'Ansan', value: 'ansan' },
{ label: 'Hwaseong', value: 'hwaseong' },
{ label: 'Pyeongtaek', value: 'pyeongtaek' },
{ label: 'Gimhae', value: 'gimhae' },
{ label: 'Changwon', value: 'changwon' },
{ label: 'Cheongju', value: 'cheongju' },
{ label: 'Pohang', value: 'pohang' },
{ label: 'Chuncheon', value: 'chuncheon' },
{ label: 'Gangneung', value: 'gangneung' },
{ label: 'Jeonju', value: 'jeonju' },
{ label: 'Mokpo', value: 'mokpo' },
{ label: 'Suncheon', value: 'suncheon' }
];

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function EnterpriseCreation({ navigation }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [feature, setFeature] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(null);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [weekSchedule, setWeekSchedule] = useState({
    Sunday: { open: null, close: null, holiday: false },
    Monday: { open: null, close: null, holiday: false },
    Tuesday: { open: null, close: null, holiday: false },
    Wednesday: { open: null, close: null, holiday: false },
    Thursday: { open: null, close: null, holiday: false },
    Friday: { open: null, close: null, holiday: false },
    Saturday: { open: null, close: null, holiday: false },
  });
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const [currentTimeType, setCurrentTimeType] = useState(null); // 'open' or 'close'

  const pickImages = async () => {
    // Request permission
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.status !== 'granted') {
      alert('Зургийн эрхийг зөвшөөрнө үү!');
      return;
    }
    // Pick multiple images
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });
    if (!pickerResult.canceled) {
      // For expo-image-picker >= 14, assets is array
      const picked = pickerResult.assets
        ? pickerResult.assets.map((a) => a.uri)
        : [pickerResult.uri];
      setImages([...images, ...picked].slice(0, 10));
    }
  };

  const handleSubmit = async () => {
  if (!name || !category || !feature || !phone || !city || !address || images.length < 1) {
    alert('Бүх талбарыг бөглөнө үү!');
    return;
  }
  // Check weekSchedule open and close times are set for all days or at least one day open
  const hasOpenDay = Object.values(weekSchedule).some(day => day.open !== null && day.close !== null && !day.holiday);
  if (!hasOpenDay) {
    alert('Долоо хоногийн хуваарилалт дээр дор хаяж нэг өдөр нээх, хаах цагийг сонгоно уу!');
    return;
  }

  const data = {
    name,
    category,
    feature,
    schedule: weekSchedule,
    phone,
    city: city.label, // label-г хадгалах
    address,
    images,
    createdAt: new Date(),
  };

  try {
    await addDoc(collection(db, 'Enterprises'), data);
    alert('Байгууллагын мэдээлэл амжилттай хадгалагдлаа!');
    // Формыг цэвэрлэх
    setName('');
    setCategory('');
    setFeature('');
    setPhone('');
    setCity(null);
    setAddress('');
    setImages([]);
    setWeekSchedule({
      Sunday: { open: null, close: null, holiday: false },
      Monday: { open: null, close: null, holiday: false },
      Tuesday: { open: null, close: null, holiday: false },
      Wednesday: { open: null, close: null, holiday: false },
      Thursday: { open: null, close: null, holiday: false },
      Friday: { open: null, close: null, holiday: false },
      Saturday: { open: null, close: null, holiday: false },
    });
    navigation.goBack(); // Буцах товч дарахгүй бол Enterprise хуудас руу
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('Мэдээллийг хадгалах үед алдаа гарлаа!');
  }
};

  const openTimePicker = (day, type) => {
    setCurrentDay(day);
    setCurrentTimeType(type);
    setTimePickerVisible(true);
  };

  const handleConfirmTime = (time) => {
    setTimePickerVisible(false);
    if (currentDay && currentTimeType) {
      const hours = time.getHours().toString().padStart(2, '0');
      const minutes = time.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;
      setWeekSchedule(prev => ({
        ...prev,
        [currentDay]: {
          ...prev[currentDay],
          [currentTimeType]: timeString
        }
      }));
    }
    setCurrentDay(null);
    setCurrentTimeType(null);
  };

  const handleCancelTime = () => {
    setTimePickerVisible(false);
    setCurrentDay(null);
    setCurrentTimeType(null);
  };

  const applyDefaultToAllDays = (open, close) => {
    const newSchedule = {};
    weekDays.forEach(day => {
      newSchedule[day] = { open, close, holiday: false };
    });
    setWeekSchedule(newSchedule);
  };

  const toggleHoliday = (day) => {
    setWeekSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        holiday: !prev[day].holiday,
        ...( !prev[day].holiday ? { open: null, close: null } : {} ),
      }
    }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
      <Text style={styles.headerTitle}>Байгууллагын профайл үүсгэх</Text>
      </View>
      <Text style={styles.label}>Байгууллагын нэр</Text>
      <TextInput
        style={styles.input}
        placeholder="Байгууллагын нэр"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Категори</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowCategoryPicker(true)}
      >
        <Text style={{ color: category ? '#222' : '#aaa' }}>
          {category || 'Категори сонгох'}
        </Text>
      </TouchableOpacity>
      {showCategoryPicker && (
        <View style={styles.modal}>
          <ScrollView> 
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.modalItem}
              onPress={() => {
                setCategory(cat);
                setShowCategoryPicker(false);
              }}
            >
              <Text style={styles.modalItemText}>{cat}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Хаах" onPress={() => setShowCategoryPicker(false)} />
          </ScrollView>
        </View>
      )}

      <Text style={styles.label}>Байгууллагын онцлог (нэг өгүүлбэр)</Text>
      <TextInput
        style={styles.input}
        placeholder="Онцлог"
        value={feature}
        onChangeText={setFeature}
      />

      <Text style={styles.label}>Цагийн хуваарь</Text>

      {weekDays.map(day => (
        <View key={day} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ flex: 1, fontSize: 16 }}>{day}</Text>
          <TouchableOpacity
            style={[styles.scheduleButton, { backgroundColor: weekSchedule[day].holiday ? '#999' : '#2196f3' }]}
            onPress={() => toggleHoliday(day)}
          >
            <Text style={{ color: '#fff' }}>{weekSchedule[day].holiday ? 'Амралтын өдөр' : 'Ажиллахгүй'}</Text>
          </TouchableOpacity>
          {!weekSchedule[day].holiday && (
            <>
              <TouchableOpacity
                style={[styles.scheduleButton, { backgroundColor: weekSchedule[day].open ? '#4caf50' : '#ccc', marginLeft: 8 }]}
                onPress={() => openTimePicker(day, 'open')}
              >
                <Text style={{ color: '#fff' }}>{weekSchedule[day].open || 'Open'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.scheduleButton, { backgroundColor: weekSchedule[day].close ? '#f44336' : '#ccc', marginLeft: 8 }]}
                onPress={() => openTimePicker(day, 'close')}
              >
                <Text style={{ color: '#fff' }}>{weekSchedule[day].close || 'Close'}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ))}

      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={handleCancelTime}
      />

      <Text style={styles.label}>Утасны дугаар</Text>
      <TextInput
        style={styles.input}
        placeholder="Утасны дугаар"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Хот</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowCityPicker(true)}
      >
        <Text style={{ color: city ? '#222' : '#aaa' }}>
          {city ? city.label : 'Хот сонгох'}
        </Text>
      </TouchableOpacity>
      {showCityPicker && (
        <View style={styles.modal}>
          <ScrollView>  
          {cities.map((c) => (
            <TouchableOpacity
              key={c.value}
              style={styles.modalItem}
              onPress={() => {
                setCity(c);
                setShowCityPicker(false);
              }}
            >
              <Text style={styles.modalItemText}>{c.label}</Text>
            </TouchableOpacity>
          ))}
          <Button title="Хаах" onPress={() => setShowCityPicker(false)} />
          </ScrollView>
        </View>
      )}

      <Text style={styles.label}>Дэлгэрэнгүй хаяг</Text>
      <TextInput
        style={styles.input}
        placeholder="Хаяг"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Зураг</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 }}>
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={styles.imageThumb}
          />
        ))}
        <TouchableOpacity style={styles.imagePickerBtn} onPress={pickImages}>
          <Text style={{ fontSize: 30, color: '#888' }}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#888', marginBottom: 12 }}>
        {images.length < 1 ? 'Байгууллагын нүүр зургыг оруулна уу.' : `${images.length} зураг сонгосон`}
      </Text>

      <Button style={styles.submitButton} title="Бүртгүүлэх" onPress={handleSubmit} disabled={images.length < 1} />
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 4,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 4,
  },
  scheduleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 2,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    maxHeight: '50%',
    overflow: 'scroll',
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  modalItemText: {
    fontSize: 16,
  },
  imageThumb: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePickerBtn: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 10,
  },
});