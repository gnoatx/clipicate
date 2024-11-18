import { View, Text, Button, Modal } from "react-native"
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
                source={video}
                ref={videoRef}                                  
                onBuffer={onBuffer}            
                onError={onError}
                style={styles.backgroundVideo}
            />
        )
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView>
                <Modal>
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
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}