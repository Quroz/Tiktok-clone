import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/clerk-expo"
import GlobalApi from "../../utils/GlobalApi"

const HomeScreen = () => {
    const { user } = useUser();
    const { updateProfileImage, getAllPosts } = GlobalApi()
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAllPostsHandler = async () => {
            const data = await getAllPosts()
            setData(data)
        }
        getAllPostsHandler()
    }, [])

    console.log("DAAETE", data)

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