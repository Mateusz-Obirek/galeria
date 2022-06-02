import React, { Component } from 'react'
import { Button, View, Text } from 'react-native'
import * as Font from "expo-font";

export class Screen1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fontloaded: false
        }
    }
    render() {
        return (
            <View>
                <Button
                    title="go to screen2"
                    onPress={() => this.props.navigation.navigate("s2")}
                />
                {this.state.fontloaded ?
                    <View>
                        <Text style={{
                            fontFamily: 'myfont',
                            fontSize: 100
                        }}>Test</Text>
                    </View>
                    :
                    null
                }
            </View >
        )
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../assets/bullpen3d.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        console.log('loaded')
        this.setState({ fontloaded: true })
    }
}

export default Screen1
