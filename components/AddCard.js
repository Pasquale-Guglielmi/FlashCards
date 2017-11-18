import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Picker,
} from 'react-native'
import { submitEntryCard } from '../utils/api'

class AddCard extends Component {
    state = {
        question: '',
        answer: true,
    }

    handleSubmit() {
        const { navigation } = this.props
        const  { entry, updateDeck } = navigation.state.params
        const newCard = {
            question: this.state.question,
            answer: this.state.answer,
        }
        const key = entry.title
        this.setState({question: '', answer: true})

        return submitEntryCard(key, newCard).then((res) => {
            if(res === 'OK') {
                updateDeck()
                alert('A new card was added to the deck: ' + key)
            } else {
                if(res === 'ERROR') {
                    return alert('Sorry, an error occurred!')
                }
            }
        })
    }
    render() {
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                    <View style={styles.container}>
                        <Text style={styles.title}>
                            Question:
                        </Text>
                        <KeyboardAvoidingView behavior="padding">
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => this.setState({question: text})}
                                value={this.state.question}/>
                        </KeyboardAvoidingView>
                        <Text style={styles.title}>
                            Answer:
                        </Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.answer}
                                onValueChange={(itemValue) => this.setState({answer: itemValue})}>
                                    <Picker.Item label="true" value={true} />
                                    <Picker.Item label="false" value={false} />
                            </Picker>
                        </View>
                        <TouchableOpacity
                            disabled={this.state.question === ''}
                            style={[styles.submit, {backgroundColor: '#111'}]}
                            onPress={this.handleSubmit.bind(this)}>
                            <Text style={[styles.btnText, {color: '#fff'}]}>ADD CARD</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  pickerWrapper: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#111',
    marginBottom: 20,
  },
  picker: {
    width: 100,
    height: 40,
  },
  title: {
    fontSize: 20,
    margin: 20,
    paddingTop: 20,
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
    marginBottom: 100,
  },
  submit: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#111',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
  },
});

export default AddCard