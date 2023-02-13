import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MCI from '@expo/vector-icons/MaterialCommunityIcons';
import FA5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';

import WeatherCodeCard from './components/WeatherCodeCard';


export default function App() {

  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const getWeather = async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&hourly=temperature_2m,weathercode,windspeed_10m&current_weather=true&windspeed_unit=ms&timezone=Europe%2FHelsinki');
    const json = await response.json();
    setData(json);

  }

  useEffect(() => {
    getWeather().then(() => {
      const weatherDate = new Date(data.current_weather.time);
      const date = weatherDate.toLocaleDateString('fi-FI', {weekday: 'long'});
      const time = weatherDate.toLocaleTimeString('fi-FI', {hour: '2-digit', minute: '2-digit'});
      setDate(date);
      setTime(time);
  });
  }, []);

  return (
    <View style={styles.container}>
      {data.length === 0 ?
        <Text>Lataa...</Text>
        :
        <>
          <View style={styles.displayData} >
            <Ionicons name="location-sharp" size={32} color="grey" />
            <Text>Sää Oulu</Text>
          </View>

          <View style={styles.displayData}>
            <Text>{date}</Text>
            <Text>{time}</Text>
          </View>

          <View style={styles.displayData}>
            <WeatherCodeCard data={data.current_weather.weathercode} />
          </View>

          <View style={styles.displayData} >
            <MCI name="temperature-celsius" size={32} color="grey" />
            <Text>Lämpötila: {data.current_weather.temperature}</Text>
          </View>

          <View style={styles.displayData} >
            <FA5 name="wind" size={32} color="grey" />
            <Text>Tuuli: {data.current_weather.windspeed} m/s</Text>
          </View>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDECE3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayData: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
  }
});
