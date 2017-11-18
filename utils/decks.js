import { AsyncStorage } from 'react-native'

export const DECKS_STORAGE_KEY = 'FlashCards:decks'

function setDummyData() {
    let dummyData = {
        Animals: {
            title: 'Animals',
            questions: [
                {
                    question: 'Are all types of snakes poisonous?',
                    answer: false
                },
                {
                    question: 'Do camels store water in their humps?',
                    answer: true
                },
                {
                    question: 'Can an ostrich fly?',
                    answer: false
                },
                {
                    question: 'Can birds swim?',
                    answer: true
                },
            ]
        },
        Random: {
            title: 'Random',
            questions: [
                {
                    question: 'Lightning never strikes in the same place twice.',
                    answer: false
                },
                {
                    question: 'If you cry in space the tears just stick to your face.',
                    answer: true
                },
                {
                    question: 'If you cut an earthworm in half, both halves can regrow their body.',
                    answer: false
                },
                {
                    question: 'Humans can distinguish between over a trillion different smells.',
                    answer: true
                },
                {
                    question: 'Adults have fewer bones than babies do.',
                    answer: true
                },
                {
                    question: 'Napoleon Bonaparte was extremely short.',
                    answer: false
                },
                {
                    question: 'Goldfish only have a memory of three seconds.',
                    answer: false
                },
                {
                    question: 'There are more cells of bacteria in your body than there are human cells.',
                    answer: true
                }
            ]
        }
    };
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}

export function formatDecksResults (results) {
  return (!results)
    ? setDummyData()
    : JSON.parse(results)
}
