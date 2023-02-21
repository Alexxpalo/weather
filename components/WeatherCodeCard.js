import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import weathercodenames from '../assets/weathercodes.json';
import Ionicons from '@expo/vector-icons/Ionicons';

class WeatherCodeCard extends Component {

    render() {

        return(
            <>
            <Ionicons name={weathercodenames[this.props.data][1]} size={32} color="white"/>
            </>
        );
    }
};

export default WeatherCodeCard;