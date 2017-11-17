import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDecksResults } from './decks'

const submitResponse = {
    submitted: 'OK',
    alreadyPresent: 'ALREADY EXISTS',
    error: 'ERROR'
}

export function fetchDecksResults() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(formatDecksResults)
}

export function submitEntryDeck(title) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((response) => {
        const data = JSON.parse(response)
        if(data[title]) {
            return submitResponse.alreadyPresent
        }
    const newDeck = {title: title, questions: []}
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: newDeck
    })).then(() => submitResponse.submitted)
    }).catch((err) => submitResponse.error)
}