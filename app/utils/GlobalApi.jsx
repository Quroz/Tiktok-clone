import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { supabase } from "../utils/SupabaseConfig"

export default function GlobalApi() {

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

    return { generateThumbnail, pickImage, uploadUserToSupabase, updateProfileImage }
}
