import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    StatusBar, } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator } from 'react-navigation'
import Decks from './components/Decks'

function MyStatusBar ({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor}/>
        </View>
    )
}

function NewDeck () {
    return (
        <View style={styles.container}>
            <Text>Add New Deck Here</Text>
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Deck',
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'NewDeck',
        }
    },
}, {
    navigationOptions: {
        headers: null,
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#4e4cb8' : '#fff',
        style: {
            height: 50,
            backgroundColor: Platform.OS === 'ios' ? '#fff' : '#4e4cb8'
        }
    }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MyStatusBar backgroundColor='#4e4cb8' barStyle='light-content'/>
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});