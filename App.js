import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import TabsNavigation from "./app/navigation/TabsNavigation";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-Medium.ttf"),
  });

  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  return (
    <View style={styles.container}>
      <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <SignedIn>
          <StatusBar style="auto" />
          <NavigationContainer>
            <TabsNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </ClerkProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
