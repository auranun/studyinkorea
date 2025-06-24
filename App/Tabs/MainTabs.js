import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import Enterprise from './Enterprise'; // Байгууллага
import Services from './Services'; // Орчуулга
import Event from './Event'; // Эвент
import Icon from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home': iconName = 'home-outline'; break;
            case 'Байгууллага': iconName = 'business-outline'; break;
            case 'Үйлчилгээ': iconName = 'language-outline'; break;
            case 'Эвент': iconName = 'calendar-outline'; break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0085FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Байгууллага" component={Enterprise} />
      <Tab.Screen name="Үйлчилгээ" component={Services} />
      <Tab.Screen name="Эвент" component={Event} />
    </Tab.Navigator>
  );
}