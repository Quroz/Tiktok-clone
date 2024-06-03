import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUser } from "@clerk/clerk-expo"
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ProfileIntro = ({ data, likes }) => {
    const { user } = useUser()
    return (
        <View>
            <Text style={{ fontFamily: "outfit-bold", marginTop: 40, fontSize: 25 }}>Profile</Text>
            <View style={{ alignItems: "center", gap: 2 }}>
                <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 99 }} />
                <Text style={{ fontSize: 22, fontFamily: "outfit-medium" }}>{user?.fullName}</Text>
                <Text style={{ fontSize: 17, fontFamily: "outfit", color: "gray" }}>{user?.primaryEmailAddress.emailAddress}</Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "space-between", width: "100%", flexDirection: "row", marginTop: 25 }}>
                <View style={{ alignItems: "center" }}>
                    <FontAwesome name="video-camera" size={24} color="black" />
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>{data.length} Posts</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <AntDesign name="heart" size={24} color="black" />
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>{likes && likes} Likes</Text>
                </View>
            </View>
        </View>
    )
}

export default ProfileIntro

const styles = StyleSheet.create({})