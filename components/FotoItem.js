import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'

export class FotoItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onPress(this.props.uri)
                }}>
                <Image
                    style={{
                        width: this.props.width,
                        height: this.props.height,

                    }}
                    source={{ uri: this.props.uri }}
                />
            </TouchableOpacity>
        )
    }
}

export default FotoItem
