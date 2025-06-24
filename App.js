import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './App/Screens/Login';
import MainTabs from './App/Tabs/MainTabs'; 
import HomeScreen from './App/Tabs/Home';
import NotificationsScreen from './App/Components/Notifications';
import SearchScreen from './App/Components/Search';
import SettingsScreen from './App/Components/Settings';
import BlogDetail from './App/Screens/BlogDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="BlogDetail" component={BlogDetail} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}