import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDecksResults } from './decks'


export function fetchDecksResults() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecksResults)
}