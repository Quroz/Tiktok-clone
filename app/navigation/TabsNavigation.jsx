import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from "../screens/SearchScreen/SearchScreen"
import AddScreen from '../screens/AddScreen/AddScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { AddNavigation } from './AddNavigation';
import { HomeNavigation } from './HomeNavigation';


const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeNavigation} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Add" component={AddNavigation} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}