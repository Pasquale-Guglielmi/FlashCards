import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Animated
} from 'react-native'

class DeckDetail extends Component {
    state = {
        opacity: new Animated.Value(0),
    }
    static navigationOptions = ({ navigation }) => {
        const { entry } = navigation.state.params
        return {
            title: entry.title
        }
    }
    componentDidMount() {
        const { opacity } = this.state
        Animated.timing(opacity, {toValue: 1, duration: 800})
            .start()
    }
    render() {
        const { entry } = this.props.navigation.state.params
        const { opacity } = this.state
        return (
            <Animated.View style={{opacity}}><Text>{JSON.stringify(entry)}</Text></Animated.View>
        )
    }
}

export default DeckDetail