import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { supabase } from "../utils/SupabaseConfig"
import { s3bucket } from "../utils/AWSConfig"

export default function GlobalApi() {


    //Supabase
    const updateProfileImage = async (imageUrl, emailAddress) => {
        const { data, error } = await supabase.from("Auth").update({ "profileImage": imageUrl }).eq("email", emailAddress).is("profileImage", null).select();
        if (error) {
            console.log("Error updating profile image:", error);
        }
    };

    const uploadUserToSupabase = async (user) => {
        const { data, error } = await supabase
            .from('Auth')
            .insert([
                {
                    name: user.firstName,
                    email: user.emailAddress,
                    username: user.emailAddress.split("@")[0],
                }
            ]).select()

        if (error) {
            console.log(error)
        } else {
            console.log(data)
        }
    }

    const likeUnlikePost = async (postIdRef, email, isLike) => {
        if (!isLike) {
            const { data, error } = await supabase.from("Likes").insert([{
                postIdRef: postIdRef,
                email: email
            }]).select();
            if (error) {
                console.log("Error liking post", error);
            } else {
            }
        } else {
            const { data, error } = await supabase.from("Likes").delete().eq("postIdRef", postIdRef).eq("email", email).select();
            if (error) {
                console.log("Error unliking post", error);
            } else {
            }
        }
    }


    const getAllPosts = async () => {
        const { data, error } = await supabase.from("UserPost").select("*, Auth(username, name, profileImage), Likes(email, postIdRef)").order("id", { ascending: false });
        if (error) {
            console.log("Error", error);
        } else {
            return data
        }
    }

    const publishHandler = async (params, userEmail, description) => {
        try {
            const videoUrlRes = await uploadFileToAws(params.video, "video")
            const thumbnailRes = await uploadFileToAws(params.thumbnail, "image")

            if (videoUrlRes && thumbnailRes) {

                const { data, error } = await supabase
                    .from("UserPost")
                    .insert([
                        {
                            videoUrl: videoUrlRes,
                            thumbnail: thumbnailRes,
                            description: description,
                            emailRef: userEmail
                        }
                    ]).select()
                if (error) {
                    console.log(error)
                }
                else {
                    return data
                }
            }
        } catch (error) {
            console.log(error)
        }


    }



    //Image and thumbnail
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const videoUri = result.assets[0].uri;
            const thumbnail = await generateThumbnail(videoUri);
            return { videoUri, thumbnail };
        }
        return null;
    };

    const generateThumbnail = async (videoUri) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                videoUri,
                {
                    time: 10000,
                }
            );
            return uri;
        } catch (e) {
            console.warn(e);
        }
        return null;
    };



    //AWS
    const uploadFileToAws = async (file, type) => {
        const fileType = file.split(".").pop()
        const params = {
            Bucket: "tiktokclone2",
            Key: `tiktok-${Date.now()}.${fileType}`,
            Body: await fetch(file).then((res) => res.blob()),
            ACL: "public-read",
            ContentType: type == "video" ? `video/${fileType}` : `image/${fileType}`,
        }

        try {
            const data = await s3bucket.upload(params).promise()
            return data?.Location
        } catch (error) {
            console.log("Upload Error", error)
            return null
        }
    }

    return { generateThumbnail, pickImage, uploadUserToSupabase, updateProfileImage, publishHandler, getAllPosts, likeUnlikePost }
}
