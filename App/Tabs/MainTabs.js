import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home';
import Enterprise from './Enterprise'; // Байгууллага
import Services from './Services'; // Орчуулга
import Event from './Event'; // Эвент
import Community from './Community';
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
            case 'Enterprise': iconName = 'business-outline'; break;
            case 'Freelancer': iconName = 'language-outline'; break;
            case 'Event': iconName = 'calendar-outline'; break;
            case 'Community': iconName = 'people-outline'; break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0085FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Enterprise" component={Enterprise} />
      {/*<Tab.Screen name="Freelancer" component={Services} />*/}
      <Tab.Screen name="Event" component={Event} />
      <Tab.Screen name="Community" component={Community} />
    </Tab.Navigator>
  );
}