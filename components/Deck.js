import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'

class Deck extends Component {
    render() {
    const { entry } = this.props
        return (
            <View>
                <Text>{JSON.stringify(entry)}</Text>
            </View>
        )
    }
}

export default Deck