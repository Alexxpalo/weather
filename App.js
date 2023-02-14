import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

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
    setLocationLat(selectedLocation.Coordinates[0]);
    setLocationLon(selectedLocation.Coordinates[1]);
  };

  return (
    <View style={styles.container}>
      {data.length === 0 ?
        <Text>Lataa...</Text>
        :
        <>

          <View style={styles.headerContainer}>

            <View style={styles.headerLocation}>
              <Ionicons name="location-sharp" size={32} color="grey" />
              <TextInput value={location} onChangeText={setLocation} onSubmitEditing={getLocation} style={[styles.headerText, styles.cityInput]} />
            </View>

            <View style={styles.headerLine}></View>

            <View>
            <Text style={styles.headerText}>{date}</Text>
            </View>

            <View style={styles.headerLine}></View>

            <View>
            <Text style={styles.headerText}>{time}</Text>
            </View>

          </View>

          <View style={styles.displayData}>
            <WeatherCodeCard data={data.current_weather.weathercode} />
          </View>

          <View style={styles.displayData} >
            <MCI name="temperature-celsius" size={32} color="grey" />
            <Text>Lämpötila: {data.current_weather.temperature}</Text>
          </View>

          <View style={styles.displayDataRow} >
            <View style={styles.displayDataRowItem}><FA5 name="temperature-high" size={16} color="grey" /><Text>{data.daily.temperature_2m_max[0]}</Text></View>
            <View style={styles.displayDataRowItem}><FA5 name="temperature-low" size={16} color="grey" /><Text>{data.daily.temperature_2m_min[0]}</Text></View>
          </View>

          <View style={styles.displayData} >
            <FA5 name="wind" size={32} color="grey" />
            <Text>Tuuli: {data.current_weather.windspeed} m/s</Text>
          </View>

          <View style={styles.sunDataContainer}>
            <Text>Auringon nousu- ja lasku huomenna</Text>
            <View style={styles.sunDataRow}>
              <View style={styles.sunDataItem}><MCI name="weather-sunset-up" size={32} color="grey" /><Text>{sunrise}</Text></View>
              <View style={styles.sunDataItem}><MCI name="weather-sunset-down" size={32} color="grey" /><Text>{sunset}</Text></View>
            </View>
          </View>
        </>
      }
    </View>
  );
}