import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';

class WeatherCodeCard extends Component {
    render() {

        if (this.props.data == 0){
        return <Text>{this.props.data}</Text>;
        } else if (this.props.data == 1){
        return <Text>{this.props.data}</Text>;
        }
    }
};

export default WeatherCodeCard;