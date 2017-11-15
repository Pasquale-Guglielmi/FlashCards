import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'FlashCards:decks'

function setDummyData() {
    let dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        Redux: {
            title: 'Redux',
            questions: [
                {
                    question: 'Is Redux a library for managing state?',
                    answer: 'yes'
                },
                {
                    question: 'Do you use reducers to update State',
                    answer: 'no'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'If you bind a function you cannot pass additional arguments to it',
                    answer: 'no'
                },
                {
                    question: 'A function is just an object',
                    answer: 'yes'
                }
            ]
        },
    };
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatDecksResults (results) {
  return (!results)
    ? setDummyData()
    : JSON.parse(results)
}
