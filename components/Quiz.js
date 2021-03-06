import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    ScrollView,
    ActivityIndicator,
    Modal,
} from 'react-native'
import { setNotification, clearNotifications } from '../utils/notifications'

class Quiz extends Component {
    state = {
        opacity: new Animated.Value(0),
        progress: 0,
        total: null,
        score: 0,
        questions: null,
        displayAnswer: false,
        modalVisible: false,
    }
    goBackToDeck() {
        const { navigation } = this.props
        const { entry } = navigation.state.params
        const deckKey = entry.title
        return navigation.goBack()
    }
    restartQuiz() {
        this.setState({
            progress: 0,
            score: 0,
            displayAnswer: false,
            modalVisible: false,
        })
    }
    goNext() {
        const { progress, total } = this.state
        if((progress + 1) === total) {
            return this.finishQuiz()
        } else {
            return this.setState({progress: progress + 1})
        }
    }
    startQuiz() {
        const { entry } = this.props.navigation.state.params
        const { questions } = entry
        const total = questions.length
        this.setState({questions, total})
    }
    finishQuiz() {
        const { modalVisible } = this.state
        const { navigation } = this.props
        const { entry } = navigation.state.params
        this.setState({modalVisible: true}, () => {
            clearNotifications()
                .then(setNotification)
        })
    }
    submitHandler(answer) {
        const { questions, progress, score } = this.state
        const question = questions[progress]
        if(answer == question.answer) {
            return this.setState({score: score + 1}, this.goNext)
        } else {
            return this.goNext()
        }
    }
    turnCard() {
        const { displayAnswer } = this.state
        this.setState({displayAnswer: !displayAnswer})
    }
    componentDidMount() {
        const { opacity } = this.state
        Animated.timing(opacity, {toValue: 1, duration: 800})
            .start()
        this.startQuiz()
    }
    render() {
        const { questions, opacity, progress, score, total, displayAnswer, modalVisible } = this.state
        if(total === null) {
            return (
              <ActivityIndicator
                animating={true}
                style={[styles.centering, {height: 80}]}
                size="large"
              />
            )
        }
        if(total === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.noDataText}>
                        Sorry, this deck has no cards!
                    </Text>
                    <Text>
                        Add one from the previous page!
                    </Text>
                </View>
            )
        }
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <Modal
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.container}>
                        <View style={styles.info}>
                            <Text style={styles.title}>
                                {'Your score: ' + (score / total)*100 + '%'}
                            </Text>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity
                                style={[styles.button, styles.border]}
                                onPress={this.goBackToDeck.bind(this)}>
                                <Text style={[styles.btnText, {color: '#111'}]}>Back To Deck</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {backgroundColor: '#111'}]}
                                onPress={this.restartQuiz.bind(this)}>
                                <Text style={[styles.btnText, {color: '#fff'}]}>Restart Quiz</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Animated.View style={[styles.container, {opacity}]}>
                    <View>
                        <Text style={styles.progress}>{(progress + 1 ) + '/' + total}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>
                            {displayAnswer
                                ? (questions[progress].answer + '')
                                : questions[progress].question}
                        </Text>
                        <TouchableOpacity onPress={this.turnCard.bind(this)}>
                            <Text style={styles.small}>
                                {displayAnswer ? 'show question' : 'show answer'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => this.submitHandler(true)}>
                            <Text style={styles.btnText}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#c11'}]}
                            onPress={() => this.submitHandler(false)}>
                            <Text style={styles.btnText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    progress: {
        paddingTop: 10,
        fontSize: 20,
    },
    actions: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom:40,
    },
    border: {
        backgroundColor: '#fff',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#111',
    },
    button: {
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#181',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        width: 250,
    },
    btnText: {
        fontSize: 36,
        fontWeight: '100',
        color: '#fff'
    },
    info: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom:40,
    },
    small: {
        fontSize: 26,
        color: '#c11',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 26,
        paddingTop: 20,
        paddingBottom:20,
        color: '#222',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    noDataText: {
      fontSize: 30,
      fontWeight: '300',
      textAlign: 'center',
    }
})

export default Quiz