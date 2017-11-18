import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Animated,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native'
import { submitEntryDeck } from '../utils/api'
import { fetchDeck } from '../utils/api'

class AddDeck extends Component {
    state = {
        text: '',
    }

    handleSubmit() {
        const { navigation } = this.props
        alert(JSON.stringify(navigation, null, 2))
        let { text } = this.state
        text = text.replace(/^\s+|\s+$/g, "");
        this.setState({text: ''})

        return submitEntryDeck(text).then((res) => {
            if(res === 'OK') {
                return fetchDeck(text).then((deck) => {
                    navigation.navigate('DeckDetail', { entry: deck, deckKey: text })
                })
            } else {
                if(res === 'ERROR') {
                    return alert('Sorry, an error occurred!')
                }
            }
            return alert(res)

        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Add the title of the deck you want to create:
                    </Text>
                </View>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding">
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({text: text})}
                            value={this.state.text}/>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        disabled={this.state.text === ''}
                        style={[styles.submit, {backgroundColor: '#111'}]}
                        onPress={this.handleSubmit.bind(this)}>
                        <Text style={[styles.btnText, {color: '#fff'}]}>SUBMIT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    margin: 20,
    paddingTop: 20,
    paddingBottom:20,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  submit: {
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
    width: 200,
  },
});

export default AddDeck