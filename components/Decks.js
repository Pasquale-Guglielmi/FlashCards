import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
} from 'react-native'
import { fetchDecksResults } from '../utils/api'
import Deck from './Deck'

class Decks extends React.Component {
    state = {
        entries: null,
    }
    updateDecksList() {
        return fetchDecksResults()
            .then((entries) => {
                this.setState({
                entries: entries
            })
        })
    }
    componentDidMount() {
        this.updateDecksList()
    }
    render() {
        this.updateDecksList()
        const { entries } = this.state
        const { navigation } = this.props
        if(entries === null) {
            return (
              <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="large"
              />
            )
        }
        if(entries === {}) {
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
                <View style={{marginBottom: 100}}>
                    {Object.keys(entries).map((key) => {
                        return (
                            <Deck
                                navigation={navigation}
                                entry={entries[key]}
                                key={key} />
                        )
                    })}
                </View>
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