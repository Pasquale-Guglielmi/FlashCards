import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    TouchableOpacity,
    Animated,
    ScrollView,
} from 'react-native'

class Quiz extends Component {
    state = {
        opacity: new Animated.Value(0),
    }
    submitAnswer(answer) {
        alert(answer)
    }
    componentDidMount() {
        const { opacity } = this.state
        Animated.timing(opacity, {toValue: 1, duration: 800})
            .start()
    }
    render() {
        const { entry } = this.props.navigation.state.params
        const { opacity } = this.state
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <Animated.View style={[styles.container, {opacity}]}>
                    <View>
                        <Text>score/score</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>{entry.title}</Text>
                        <Text style={styles.small}>{entry.questions.length + ' cards'}</Text>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.button}
                            onPress={this.submitAnswer(true)}>
                            <Text style={styles.btnText}>True</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: '#111'}]}
                            onPress={this.submitAnswer(false)}>
                            <Text style={[styles.btnText, {color: '#fff'}]}>False</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
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
        fontSize: 46,
        paddingTop: 20,
        paddingBottom:20,
        color: '#222',
        fontWeight: 'bold',
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
})

export default Quiz