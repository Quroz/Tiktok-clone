import { createStackNavigator } from '@react-navigation/stack';
import AddScreen from '../screens/AddScreen/AddScreen';
import PreviewScreen from '../screens/AddScreen/PreviewScreen';

const Stack = createStackNavigator();

export function AddNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Add-home" component={AddScreen} />
            <Stack.Screen name="Preview" component={PreviewScreen} />
        </Stack.Navigator>
    );
}