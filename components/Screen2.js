import React, { Component } from 'react'
import { Button, View, Dimensions, FlatList } from 'react-native'
import * as MediaLibrary from "expo-media-library";
import FotoItem from './FotoItem';
export class Screen2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            assets: [],
            numColumns: 5,
            photoHeight: Dimensions.get("window").width / 5,
            grid: true
        }
        this.galleryInit()
    }

    render() {
        return (
            <View>
                <Button
                    title="GRID/LIST"
                    onPress={() => {
                        if (this.state.grid)
                            this.setState({ numColumns: 1, photoHeight: Dimensions.get("window").height / 5, grid: false })
                        else
                            this.setState({ numColumns: 5, photoHeight: Dimensions.get("window").width / 5, grid: true })
                    }}
                />
                <FlatList
                    key={this.state.numColumns}
                    numColumns={this.state.numColumns}
                    data={this.state.assets}
                    renderItem={({ item }) => <FotoItem width={Dimensions.get("window").width / this.state.numColumns} height={this.state.photoHeight} uri={item.uri} onPress={this.showBigPhoto} />}
                />
            </View>
        )
    }

    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
    }

    galleryInit = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        this.setState({ assets: obj.assets })
        alert(JSON.stringify(obj.assets, null, 4))
    }

    showBigPhoto = (uri) => {
        this.props.navigation.navigate("wybrane zdjęcie", { uri: uri })
    }
}

export default Screen2
