import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './App/Components/Login';
import MainTabs from './App/Tabs/MainTabs'; 
import HomeScreen from './App/Tabs/Home';
import NotificationsScreen from './App/Components/Notifications';
import SearchScreen from './App/Components/Search';
import SettingsScreen from './App/Components/Settings';
import BlogDetail from './App/Screens/BlogDetail';
import UserProfile from './App/Screens/UserProfile';
import SignUp from './App/Components/SignUp';
import ProfileCreation from './App/Screens/ProfileCreation';
import Services from './App/Tabs/Services';
import EnterpriseCreation from './App/Screens/EnterpriseCreation';
import Community from './App/Tabs/Community';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  useEffect(() => {
    // 🔹 State listener энд
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // clean-up
  }, []);

  if (loading) {
    return null; // эсвэл SplashScreen
  }


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Home" component={MainTabs} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Services" component={Services} options={{ headerShown: false }}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BlogDetail" component={BlogDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileCreation" component={ProfileCreation} options={{ headerShown: false }}/>
        <Stack.Screen name="EnterpriseCreation" component={EnterpriseCreation} options={{ headerShown: false }}/>
        <Stack.Screen name='Community' component={Community} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}