import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser"
import { Video, ResizeMode } from 'expo-av';

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
        <View style={{ flex: 1 }}>
            <Video
                style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                source={{
                    uri: 'https://cdn.pixabay.com/video/2022/06/19/120883-724673735_large.mp4',
                }}
                shouldPlay
                resizeMode='cover'
                isLooping={true}
            />

            <View style={{ alignItems: "center", paddingTop: 100, padding: 20, flex: 1, backgroundColor: "#0000005C" }}>
                <Text style={{ color: "white", fontFamily: "outfit-bold", fontSize: 40 }}>Tik Tok</Text>
                <Text style={{ fontFamily: "outfit", fontSize: 17, marginTop: 20, color: "white", textAlign: "center" }}>Ultimate Place to Share your Short Videos with Great Community</Text>

                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 7, paddingHorizontal: 40, backgroundColor: "white", borderRadius: 99, position: "absolute", bottom: 200, gap: 5 }}
                    onPress={onPress}
                >
                    <Image source={require("../../../assets/google.png")} style={{ width: 40, height: 40, borderRadius: 99 }} />
                    <Text>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})