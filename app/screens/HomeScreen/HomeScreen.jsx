import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../utils/GlobalApi";
import HomeTitle from './HomeTitle';
import VideoPosts from './VideoPosts';

const HomeScreen = () => {
    const { user } = useUser();
    const { updateProfileImage, getAllPosts } = GlobalApi();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getAllPostsHandler = async () => {
        setLoading(true);
        try {
            const data = await getAllPosts();
            setData(data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPostsHandler();
    }, []);

    useEffect(() => {
        const updateProfileImageHandler = async () => {
            if (user) {
                await updateProfileImage(user.imageUrl, user.primaryEmailAddress.emailAddress);
            }
        };
        updateProfileImageHandler();
    }, [user]);

    return (
        <View style={{ padding: 20, flex: 1, backgroundColor: "white" }}>
            <HomeTitle />
            <VideoPosts data={data} getAllPostsHandler={getAllPostsHandler} loading={loading} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
