import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScreen from "./app/screens/LoginScreen/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <SignedIn>
          <Text>You are Signed in</Text>
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
