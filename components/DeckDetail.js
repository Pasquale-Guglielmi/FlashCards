import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Animated,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import { fetchDeck } from '../utils/api'

class DeckDetail extends Component {
    state = {
        opacity: new Animated.Value(0),
        entry: null,
    }
    static navigationOptions = ({ navigation }) => {
        const { entry } = navigation.state.params
        return {
            title: entry.title
        }
    }
    addCard() {
        const { navigation } = this.props
        const { entry, update } = navigation.state.params
        navigation.navigate('AddCard', {
            entry: entry,
            update: update,
            updateDeck: this.updateDeckDetails.bind(this)
        })
    }
    updateDeckDetails() {
        const { entry } = this.props.navigation.state.params
        return fetchDeck(entry.title).then((deck) => {
            this.setState({entry: deck})
        })
    }
    componentDidMount() {
        this.updateDeckDetails()
        const { opacity } = this.state
        Animated.timing(opacity, {toValue: 1, duration: 800})
            .start()
    }
    render() {
        const { entry } = this.state
        const { opacity } = this.state
        if(entry === null) {
            return (
              <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="large"
              />
            )
        }
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <Animated.View style={[styles.container, {opacity}]}>
                    <View style={styles.info}>
                        <Text style={styles.title}>{entry.title}</Text>
                        <Text style={styles.small}>{entry.questions.length + ' cards'}</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.button} onPress={this.addCard.bind(this)}>
                            <Text style={styles.btnText}>Add Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#111'}]}>
                            <Text style={[styles.btnText, {color: '#fff'}]}>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    actions: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom:40,
    },
    button: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#111',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        width: 250,
    },
    btnText: {
        fontSize: 36,
        fontWeight: '100',
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom:40,
    },
    small: {
        fontSize: 26,
        color: '#888',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 46,
        paddingTop: 20,
        paddingBottom:20,
        color: '#222',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
})

export default DeckDetail