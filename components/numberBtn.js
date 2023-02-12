import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

class NumberBtn extends Component {


    onPress = (guess) => {
        this.props.onPress(guess);
    }


    render() {
        return (
            <View style={styles.buttonContainer}>
                <Button title={this.props.name} onPress={() => this.onPress(this.props.name)} color='black' />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
        margin: 15
    },
});

export default NumberBtn;