import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo'
import GlobalApi from '../../utils/GlobalApi';

const PreviewScreen = () => {
    const navigation = useNavigation()
    const params = useRoute().params
    const { user } = useUser()
    const { publishHandler } = GlobalApi()
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)


    const onPressHandler = async () => {
        setLoading(true)
        const data = await publishHandler(params, user?.primaryEmailAddress?.emailAddress, description)
        if (data) {
            setLoading(false)
            navigation.goBack()
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", position: "absolute", left: 20, top: 40 }}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back-circle" size={40} color="black" />
                <Text style={{ fontFamily: "outfit", fontSize: 20 }}>Back</Text>
            </TouchableOpacity>

            <View style={{ alignItems: "center", marginTop: 140, padding: 20 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Add Details</Text>
                <Image source={{ uri: params?.thumbnail }} style={{ width: 200, height: 300, borderRadius: 15, marginTop: 15 }} />
                <TextInput placeholder='Description' style={{ borderWidth: 1, borderColor: "gray", borderRadius: 10, padding: 20, width: "100%", marginTop: 15 }}
                    onChangeText={(text) => setDescription(text)}
                />
                <TouchableOpacity style={{ backgroundColor: "black", borderRadius: 99, padding: 15, paddingHorizontal: 25, marginTop: 10, alignItems: "center" }}
                    onPress={onPressHandler}
                >
                    {loading ? <ActivityIndicator color="white" /> : <Text style={{ fontFamily: "outfit-bold", fontSize: 14, color: "white" }}>Publish</Text>}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PreviewScreen

const styles = StyleSheet.create({})