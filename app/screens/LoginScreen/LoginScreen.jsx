import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser"

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);

    return (
        <View>
            <Text>LoginScreen</Text>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})