import { FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import React from 'react';
import { useNavigation } from "@react-navigation/native"

const VideoPosts = ({ data, getAllPostsHandler, loading }) => {

    const navigation = useNavigation()
    return (
        <FlatList
            style={{ marginTop: 10, paddingBottom: 40 }}
            data={data}
            onRefresh={(getAllPostsHandler)}
            refreshing={loading}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
                <TouchableHighlight style={{ flex: 1, margin: 5 }}
                    onPress={() => navigation.navigate("Video-screen", { item })}
                >
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
                        </View>
                    </View>
                </TouchableHighlight>
            )}
        />
    );
};

export default VideoPosts;

const styles = StyleSheet.create({});
