import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import weathercodenames from '../assets/weathercodes.json';
import Ionicons from '@expo/vector-icons/Ionicons';

class WeatherCodeCard extends Component {

    render() {

        return(
            <>
            <Text>{weathercodenames[this.props.data]}</Text><Ionicons name="thunderstorm"/>
            </>
        );
    }
};

export default WeatherCodeCard;