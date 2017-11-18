import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    StatusBar, } from 'react-native'
import { Constants } from 'expo'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'

function MyStatusBar ({ backgroundColor, ...props }) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor}/>
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
        }
    },
    NewDeck: {
        screen: AddDeck,
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

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            title: 'Home'
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#4e4cb8'
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#4e4cb8'
            }
        }
    }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MyStatusBar backgroundColor='#4e4cb8' barStyle='light-content'/>
        <MainNavigator />
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
