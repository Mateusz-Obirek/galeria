import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { ToastAndroid } from "react-native";

export class CameraScreen extends Component {
constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
    }
    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1, flexDirection:'row', alignItems:'flex-end', justifyContent:'space-around' }}>
                        <TouchableOpacity
                            onPress={() => {            
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                });
                            }}
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 100,
                                backgroundColor: 'orange',}}>
                            <Text>front/back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {            
                                if (this.camera) {
                                    this.takePicture()
                                }
                            }}
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                                borderRadius: 100,
                                backgroundColor: 'orange',}}>
                            <Text>+</Text>
                        </TouchableOpacity> 
                        </View>
                    </Camera>
                </View>
            );
        }
    }
    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
    }
    takePicture = async()=>{
        let foto = await this.camera.takePictureAsync();
        let asset = await MediaLibrary.createAssetAsync(foto.uri);
        ToastAndroid.showWithGravity(
                'dodano zdjęcie',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
        );
    }   
}

export default CameraScreen