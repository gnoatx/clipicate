import { View, Text, Button } from "react-native"
import Video, {VideoRef} from 'react-native-video';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useState } from "react";

export default function PreviewScreen(videoUri) {
    const [description, setDescription] = useState('')

    const VideoPlayer = () => {
        const videoRef = useRef<VideoRef>(null);
        const video = {uri: videoUri}

        return (
            <Video
                // Can be a URL or a local file.
                source={video}
                // Store reference  
                ref={videoRef}
                // Callback when remote video is buffering                                      
                onBuffer={onBuffer}
                // Callback when video cannot be loaded              
                onError={onError}
                style={styles.backgroundVideo}
            />
        )
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>Prévia</Text>
                <VideoPlayer />
                <TextInput
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Crie uma descrição para seu gif."
                />
                <Button
                    title="Enviar"
                />
                <Button
                    title="Cancelar"
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}