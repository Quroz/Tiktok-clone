import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useUser } from "@clerk/clerk-expo"

const HomeTitle = () => {

    const { user } = useUser();
    return (
        <View style={{ paddingTop: 25, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>Tik Tok</Text>
            <Image source={{ uri: user.imageUrl }} style={{ width: 50, height: 50, borderRadius: 99 }} />
        </View>
    )
}

export default HomeTitle

const styles = StyleSheet.create({})