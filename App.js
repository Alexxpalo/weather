import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import WeatherCodeCard from './components/WeatherCodeCard';


export default function App() {

  const [data, setData] = useState([]);

  const getWeather = async () => {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=65.01&longitude=25.47&hourly=temperature_2m,weathercode,windspeed_10m&current_weather=true&windspeed_unit=ms&timezone=Europe%2FHelsinki');
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {data.length === 0 ? 
      <Text>Lataa...</Text> 
      :
      <>
        <Text>Sää Oulu</Text>
        <Text>Lämpötila: {data.current_weather.temperature} c</Text>
        <Text>Tuuli: {data.current_weather.windspeed} m/s</Text>
        <WeatherCodeCard data={data.current_weather.weathercode}/>
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
});
