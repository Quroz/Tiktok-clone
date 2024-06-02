import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import GlobalApi from '../../utils/GlobalApi'
import { Video, ResizeMode } from 'expo-av';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const VideoScreen = () => {
    const params = useRoute().params
    const { getAllPosts } = GlobalApi();
    const [filteredVideos, setFilteredVideos] = useState([])
    const [data, setData] = useState([])
    const video = useRef(null);
    const bottomTabHeight = useBottomTabBarHeight();
    const [status, setStatus] = useState({});

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


    return (
        <FlatList
            data={filteredVideos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <View>
                <Video
                    ref={video}
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
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </View>}
        />
    )
}

export default VideoScreen

const styles = StyleSheet.create({})