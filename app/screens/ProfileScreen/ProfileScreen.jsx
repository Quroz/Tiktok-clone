import { StyleSheet, Text, View, FlatList, TouchableHighlight, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileIntro from './ProfileIntro'
import GlobalAPi from "../../utils/GlobalApi"
import { useUser } from "@clerk/clerk-expo"
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {

    const { getUserPosts } = GlobalAPi();
    const { user } = useUser();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [likes, setLikes] = useState(null)

    const calculateLikes = (dataArr) => {
        let totalLikes = 0
        dataArr.forEach((post) => {
            totalLikes += post.Likes.length
        })
        setLikes(totalLikes)
    }

    const getUserPostsHandler = async () => {
        const data = await getUserPosts(user?.primaryEmailAddress?.emailAddress);
        setData(data)
        calculateLikes(data)
    }
    useEffect(() => {
        setLoading(true)
        getUserPostsHandler()
        setLoading(false)
    }, [user])

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
            <ProfileIntro data={data} likes={likes} />
            <FlatList
                style={{ marginTop: 10, paddingBottom: 40 }}
                data={data}
                onRefresh={(getUserPostsHandler)}
                refreshing={loading}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableHighlight style={{ flex: 1, margin: 5 }}>
                        <View>
                            <Image
                                source={{ uri: item?.thumbnail }}
                                style={{ width: "100%", height: 250, borderRadius: 10 }}
                            />
                            <View style={{ position: "absolute", zIndex: 10, bottom: 0, padding: 7, justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <Image
                                        source={{ uri: item.Auth?.profileImage }}
                                        style={{ width: 25, height: 25, borderRadius: 99 }}
                                    />
                                    <Text style={{ color: "white", fontFamily: "outfit" }}>{item?.Auth?.name}</Text>
                                </View>
                                <View style={{
                                    alignItems: "center",
                                    fontFamily: "outfit",
                                    flexDirection: "row",
                                    gap: 5
                                }}>
                                    <Text style={{ color: "white" }}>{item?.Likes.length}</Text>
                                    <Ionicons name="heart-outline" size={24} color="white" />
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                )}
            />
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})