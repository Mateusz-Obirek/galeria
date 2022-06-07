import React, { Component } from 'react'
import { Image, TouchableOpacity } from 'react-native'

export class FotoItem extends Component {
    constructor(props) {
        super(props)
        this.state={
            isSelected: false
        }
    }
    render() {
        let styles = {width: this.props.width,
            height: this.props.height}
        if(this.state.isSelected)
        {
         styles.borderColor = 'blue'
         styles.borderWidth = 5
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onPress(this.props.uri, this.props.id)
                }}
                onLongPress={()=>{
                    if(this.state.isSelected){
                        this.setState({isSelected: false})
                        console.log(this.state.isSelected)
                        this.props.onLongPress(this.props.id, false)
                    }
                    else{
                        this.setState({isSelected: true})
                        console.log(this.state.isSelected)
                        this.props.onLongPress(this.props.id, true)
                    }
                    
                }}>
                <Image
                    style={styles}
                    source={{ uri: this.props.uri }}
                />
            </TouchableOpacity>
        )
    }
}

export default FotoItem
