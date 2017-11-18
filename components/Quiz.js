import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Animated,
    ScrollView,
    ActivityIndicator,
} from 'react-native'

class Quiz extends Component {
    state = {
        opacity: new Animated.Value(0),
        progress: 0,
        total: null,
        score: 0,
        questions: null,
        displayAnswer: false,
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
        const { score } = this.state
        const { navigation } = this.props
        const { entry } = navigation.state.params
        alert(score)
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
        const { questions, opacity, progress, total, displayAnswer } = this.state
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
                            <Text style={styles.btnText}>True</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#111'}]}
                            onPress={() => this.submitHandler(false)}>
                            <Text style={[styles.btnText, {color: '#fff'}]}>False</Text>
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
    button: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#111',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        width: 250,
    },
    btnText: {
        fontSize: 36,
        fontWeight: '100',
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
        color: '#888',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 36,
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