import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function GlobalApi() {

    const pickImage = async (setVideoUri, setThumbnail) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
            generateThumbnail(result.assets[0].uri, setThumbnail)
        }
    };

    const generateThumbnail = async (videoUri, setThumbnail) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(
                videoUri,
                {
                    time: 10000,
                }
            );

            setThumbnail(uri)
        } catch (e) {
            console.warn(e);
        }
    };

    return { generateThumbnail, pickImage }
}



