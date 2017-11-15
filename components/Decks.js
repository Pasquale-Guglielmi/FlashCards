import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text, } from 'react-native'
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
            <View>
                {Object.keys(entries).map((key) => <Deck entry={entries[key]} key={key} />)}
            </View>
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