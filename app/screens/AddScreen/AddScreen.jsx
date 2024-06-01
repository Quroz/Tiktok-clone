import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import GlobalApi from "../../utils/GlobalApi"

const AddScreen = () => {

    const { pickImage } = GlobalApi()
    const navigation = useNavigation()

    const uploadHandler = async () => {
        const result = await pickImage()
        if (result)
            navigation.navigate("Preview", { video: result.videoUri, thumbnail: result.thumbnail })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <MaterialCommunityIcons name="cloud-upload-outline" size={120} color="blue" />
                <View style={{ padding: 20, alignItems: "center", gap: 10 }}>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Start Uploading Short Video</Text>
                    <Text style={{ fontFamily: "outfit", fontSize: 15, textAlign: "center" }}>Let's upload short video and start sharing your creativity with community</Text>
                    <TouchableOpacity onPress={uploadHandler} style={{ backgroundColor: "black", borderRadius: 99, padding: 15, paddingHorizontal: 25, marginTop: 10 }}>
                        <Text style={{ fontFamily: "outfit-bold", fontSize: 14, color: "white" }}>Upload Video</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddScreen

const styles = StyleSheet.create({})