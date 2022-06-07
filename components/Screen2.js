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
            grid: true,
            toRemove: []
        }
        this.funkcja = null
        
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
                <Button
                    title="OPEN CAMERA"
                    onPress={() => {
                        this.props.navigation.navigate("camera")
                    }}
                />
                <Button
                    title="REMOVE SELECTED"
                    onPress={() => {
                        this.deleteAsset()
                    }}
                />
                <FlatList
                    key={this.state.numColumns}
                    numColumns={this.state.numColumns}
                    data={this.state.assets}
                    renderItem={({ item }) => <FotoItem width={Dimensions.get("window").width / this.state.numColumns} height={this.state.photoHeight} id={item.id} uri={item.uri} onPress={this.showBigPhoto} onLongPress={this.addToRemove}/>}
                />
            </View>
        )
    }

    componentDidMount = async () => {
        this.funkcja = this.props.navigation.addListener('focus', () => {
            this.galleryInit()
        });

        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
        this.galleryInit()
    }

    componentWillUnmount() {
        this.funkcja();
}

    galleryInit = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        
        this.setState({ assets: obj.assets })
    }

    showBigPhoto = (uri, id) => {
        this.props.navigation.navigate("wybrane zdjęcie", { uri: uri, id:id})
    }

    addToRemove = (uri, toRemove) =>{
        if(toRemove){
            let tab = this.state.toRemove
            tab.push(uri)
            this.setState({toRemove: tab})
            console.log(this.state.toRemove)
        }
        else{
            let tab = this.state.toRemove
            console.log(tab.indexOf(uri))
            tab.splice(tab.indexOf(uri), 1)
            this.setState({toRemove: tab})
            console.log(this.state.toRemove)
        }  
    }

    deleteAsset = async()=>{
        console.log('remove selected')
        await MediaLibrary.deleteAssetsAsync(this.state.toRemove)
        this.setState({toRemove:[]})
        this.galleryInit()
    }
}

export default Screen2
