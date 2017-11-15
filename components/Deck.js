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
        return navigation.navigate('DeckDetail', { entry: entry })
    }
    render() {
    const { entry } = this.props
    const cardsCount = entry.questions.length
        return (
            <View style={styles.item}>
                <TouchableOpacity
                    style={[styles.container, {backgroundColor: '#efefef'}]}
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
        color: '#666',
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
        marginTop: 20,
        borderBottomColor: '#bbb',
        borderBottomWidth: 2,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Deck