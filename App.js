import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import FA5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from './styles.js';
import Location from './assets/citycoordinates.json';
import WeatherCodeCard from './components/WeatherCodeCard';

export default function App() {

  const [data, setData] = useState([]);
  const [location, setLocation] = useState("Oulu");
  const [locationLat, setLocationLat] = useState(65.01);
  const [locationLon, setLocationLon] = useState(25.47);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  const getWeather = async () => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${locationLat}&longitude=${locationLon}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FHelsinki`);
    const json = await response.json();
    setData(json);
  }


  useEffect(() => {
    getWeather();
  }, [locationLat, locationLon]);

  useEffect(() => {
    if (data.current_weather) {
      const weatherDate = new Date(data.current_weather.time);
      const date = weatherDate.toLocaleDateString('fi-FI', { weekday: 'long' });
      const time = weatherDate.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
      const sunriseDate = new Date(data.daily.sunrise[0]);
      const sunrise = sunriseDate.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
      const sunsetDate = new Date(data.daily.sunset[0]);
      const sunset = sunsetDate.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
      setSunrise(sunrise);
      setSunset(sunset);
      setDate(date);
      setTime(time);
    }
  }, [data]);

  const getLocation = () => {
    const selectedLocation = Location.find(loc => loc.City === location);
    if (selectedLocation) {
      setLocationLat(selectedLocation.Coordinates[0]);
      setLocationLon(selectedLocation.Coordinates[1]);
    } else {
      Alert.alert("Virhe", "Paikkaa ei löytynyt");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF9C5', '#FFCECE']}
        style={styles.background}
      />
      {data.length === 0 ?
        <Text>Lataa...</Text>
        :
        <>
          <View style={styles.loaded}>
            <View style={styles.item1}>
              <TextInput
                value={location}
                onChangeText={setLocation}
                onSubmitEditing={getLocation}
                style={[styles.grayText, styles.cityInput]} />
            </View>

            <View style={styles.weatherIcon}>
              <WeatherCodeCard data={data.current_weather.weathercode} />
            </View>

            <View style={styles.item1}>
              <Text style={[styles.grayText, styles.timeText]}>{time}</Text>
            </View>

            <View style={styles.item2}>
              <Text style={[styles.whiteText, styles.Text20]}>{data.current_weather.temperature}</Text><Text style={styles.unitText}>°C</Text>
            </View>

            <View style={styles.item2}>
              <Text style={[styles.whiteText, styles.Text20]}>{data.current_weather.windspeed}</Text><Text style={styles.unitText}>m/s</Text>
            </View>

            <View style={styles.item2}>
              <Text style={styles.whiteText}>Auringon nousu ja lasku huomenna</Text>
              <Text style={styles.whiteText}><MCI name="weather-sunset-up" size={32} />{sunrise} - {sunset}<MCI name="weather-sunset-down" size={32} /></Text>
            </View>
          </View>
        </>
      }
    </View>
  );
}