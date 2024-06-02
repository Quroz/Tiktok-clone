import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import VideoScreen from '../screens/HomeScreen/VideoScreen';

const Stack = createStackNavigator();

export function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Home-screen" component={HomeScreen} />
            <Stack.Screen name="Video-screen" component={VideoScreen} />
        </Stack.Navigator>
    );
}