import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from "@clerk/clerk-expo"
import GlobalApi from "../../utils/GlobalApi"

const HomeScreen = () => {
    const { user } = useUser();
    const { updateProfileImage } = GlobalApi()

    useEffect(() => {
        const updateProfileImageHandler = async () => {
            if (user) {
                await updateProfileImage(user.imageUrl, user.primaryEmailAddress.emailAddress)
            }
        }
        updateProfileImageHandler()
    }, [user])

    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})