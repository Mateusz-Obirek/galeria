import React, { Component } from 'react'
import { Image, View, Button } from 'react-native'
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from "expo-media-library";

export class BigFotoScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ width: "90%", height: "90%" }}>
                    <Image
                        resizeMode={'cover'}
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: this.props.route.params.uri }}
                    />
                </View>
                <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-around' }}>
                    <Button
                        title="SHARE"
                        onPress={() => {
                            Sharing.shareAsync(this.props.route.params.uri)
                        }}
                    />
                    <Button
                        title="DELETE"
                        onPress={() => {
                            this.deleteAsset()
                        }}
                    />
                </View>
            </View >
        )
    }

    deleteAsset = async()=>{
        console.log(this.props.route.params.id)
        await MediaLibrary.deleteAssetsAsync([this.props.route.params.id.toString()])
        this.props.navigation.goBack();
    }
}

export default BigFotoScreen
