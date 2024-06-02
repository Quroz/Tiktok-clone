import { Dimensions, FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import GlobalApi from '../../utils/GlobalApi';
import { Video, ResizeMode } from 'expo-av';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-expo"

const VideoScreen = () => {
    const params = useRoute().params;
    const { getAllPosts, likeUnlikePost } = GlobalApi();
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [data, setData] = useState([]);
    const bottomTabHeight = useBottomTabBarHeight();
    const videoRefs = useRef([]);
    const { user } = useUser()

    const getAllPostsHandler = async () => {
        try {
            const data = await getAllPosts();
            setData(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    };

    useEffect(() => {
        getAllPostsHandler();
    }, []);

    useEffect(() => {
        if (params?.item?.id) {
            const filtered = data.filter(video => video.id !== params.item.id);
            setFilteredVideos([params.item, ...filtered]);
        }
    }, [data, params]);

    const checkIsUserAlreadyLiked = (video) => {
        if (!video.Likes) {
            return false;
        }
        const result = video.Likes.find(item => item.email === user?.primaryEmailAddress.emailAddress);
        return result ? true : false;
    }

    const handleLikeUnlike = async (postId, isLike) => {
        await likeUnlikePost(postId, user.primaryEmailAddress.emailAddress, isLike);
        await getAllPostsHandler();
    }

    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View style={{
                    position: "absolute",
                    bottom: 50,
                    left: 20,
                    zIndex: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center"
                }}>
                    <View>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10
                        }}>
                            <Image source={{ uri: item.Auth?.profileImage }} style={{
                                width: 40,
                                height: 40,
                                borderRadius: 99
                            }} />
                            <Text style={{
                                fontFamily: "outfit-medium",
                                fontSize: 17,
                                color: "white"
                            }}>{item.Auth?.username}</Text>
                        </View>
                        <Text style={{
                            fontFamily: "outfit-medium",
                            fontSize: 17,
                            color: "white",
                            marginTop: 10
                        }}>{item.description}</Text>
                    </View>
                    <View style={{ marginRight: 40 }}>

                        {checkIsUserAlreadyLiked(item) ? (
                            <TouchableOpacity onPress={() => handleLikeUnlike(item.id, true)} style={{ alignItems: "center", fontFamily: "outfit", marginTop: -10 }}>
                                <Ionicons name="heart" size={35} color="red" />
                                <Text style={{ color: "white" }}>{item?.Likes?.length}</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => handleLikeUnlike(item.id, false)} style={{ alignItems: "center", fontFamily: "outfit", marginTop: -10 }}>
                                <Ionicons name="heart-outline" size={35} color="white" />
                                <Text style={{ color: "white" }}>{item?.Likes?.length}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={{
                            alignItems: "center",
                            fontFamily: "outfit",
                            marginTop: 10
                        }}>
                            <Ionicons name="chatbubble-outline" size={35} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            alignItems: "center",
                            fontFamily: "outfit",
                            marginTop: 10
                        }}>
                            <Ionicons name="paper-plane-outline" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Video
                    ref={ref => videoRefs.current[index] = ref}
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height - bottomTabHeight
                    }}
                    source={{
                        uri: item?.videoUrl,
                    }}
                    useNativeControls={false}
                    resizeMode={ResizeMode.COVER}
                    isLooping
                    shouldPlay={true}
                    onPlaybackStatusUpdate={status => { }}
                />
            </View>
        );
    };

    return (
        <FlatList
            data={filteredVideos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            windowSize={2}
            removeClippedSubviews
        />
    );
}

export default VideoScreen;
