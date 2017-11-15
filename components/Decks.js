import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native'
import { fetchDecksResults } from '../utils/api'
import Deck from './Deck'

class Decks extends React.Component {
    state = {
        entries: null,
    }
    componentDidMount() {
        fetchDecksResults()
            .then((entries) => {
                this.setState({
                    entries: entries
                })
            })
    }
    render() {
        const { entries } = this.state
        const { navigation } = this.props
        if(!entries) {
            return (
                <View style={styles.container}>
                    <Text style={styles.noDataText}>
                        No Decks
                    </Text>
                    <Text>
                        go to NEW DECK tab and add one
                    </Text>
                </View>
            )
        }
        return (
            <ScrollView>
                {Object.keys(entries).map((key) => <Deck navigation={navigation} entry={entries[key]} key={key} />)}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 40,
    fontWeight: '300'
  }
});

export default Decks