import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
} from 'react-native'

class Deck extends Component {
    handlePress = () => {
        const { entry, navigation } = this.props
        const deckKey = entry.title
        return navigation.navigate('DeckDetail', { entry, deckKey})
    }
    render() {
    const { entry } = this.props
    const cardsCount = entry.questions.length
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    style={[styles.container, {backgroundColor: '#fff'}]}
                    onPress={this.handlePress}>
                    <Text style={styles.title}>{entry.title}</Text>
                    <Text style={styles.small}>{cardsCount + ' cards'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    small: {
        fontSize: 16,
        color: '#888',
    },
    title: {
        fontSize: 26,
        paddingTop: 20,
        paddingBottom:20,
        color: '#222',
    },
    item: {
        height: 160,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
})

export default Deck