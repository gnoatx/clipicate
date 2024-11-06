import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const pickerOptions = {
    base64: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoMaxDurationn: 10,
    quality: 0.1,
    allowEditing: true,
};

const convertVideoToBase64 = async (fileUri = '') => {
    setIsLoading(true);
    try {
        const base64Data = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        setIsLoading(false);
        return base64Data;
    } catch (error) {
        console.error('Erro ao converte vídeo para base64:', error);
        setIsLoading(false);
        return null;
    }
};

const launchGallery = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
        return alert('Você precisa permitir o acesso à galeria.');
    }

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);

    if (result.assets && !result.canceled) {
        return result.assets[0].uri;
    }
    return null
};

const launchCamera = async () => {
    let permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        return alert('Você precisa permitir o acesso à câmera.');
    }

    const result = await ImagePicker.launchCameraAsync(pickerOptions);

    if (result.assets && !result.canceled) {
        return result.assets[0].uri;
    }
    return null
};