import React, { Component, useState } from 'react';
import styles from '../styles.js';
import weathercodenames from '../assets/weathercodes.json';
import Ionicons from '@expo/vector-icons/Ionicons';

class WeatherCodeCard extends Component {
    render() {

        return(
            <>
            <Ionicons style={styles.weatherIconImage} name={weathercodenames[this.props.data][1]} size={64} color={weathercodenames[this.props.data][2]}/>
            </>
        );
    }
};

export default WeatherCodeCard;