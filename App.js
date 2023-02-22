import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

import MCI from '@expo/vector-icons/MaterialCommunityIcons';

import styles from './styles.js';
import Location from './assets/citycoordinates.json';
import WeatherCodeCard from './components/WeatherCodeCard';

async function saveCity(city) {
  try {
    await SecureStore.setItemAsync('city', city);
  } catch (e) {
    console.log(e);
  }
}

async function getCity() {
  try {
    const city = await SecureStore.getItemAsync('city');
    if (city !== null) {
      return city;
    }
  } catch (e) {
    console.log(e);
  }
}

export default function App() {

  const [data, setData] = useState([]);
  const [pickedData, setPickedData] = useState({});
  const [location, setLocation] = useState("");
  const [locationLat, setLocationLat] = useState(65.01);
  const [locationLon, setLocationLon] = useState(25.47);
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();

  useEffect(() => {
    const savedCity = async () => {
      const city = await getCity();
      if (city) {
        setLocation(city);
      } else {
        setLocation("Oulu");
      }
    };
    savedCity();
  }, []);

  const getWeather = async () => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${locationLat}&longitude=${locationLon}&hourly=temperature_2m,windspeed_10m&daily=sunrise,sunset&current_weather=true&timezone=Europe%2FHelsinki`);
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    getWeather();
  }, [locationLat, locationLon]);

  useEffect(() => {
    if (data.current_weather) {
      const current_time_index = data.hourly.time.indexOf(data.current_weather.time);
      const sunriseDate = new Date(data.daily.sunrise[0]);
      const sunrise = sunriseDate.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).slice(0,5);
      const sunsetDate = new Date(data.daily.sunset[0]);
      const sunset = sunsetDate.toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).slice(0,5);
      setSunrise(sunrise);
      setSunset(sunset);
      setPickedData({
        current_temp: data.current_weather.temperature,
        current_wind: data.current_weather.windspeed,
        current_weather: data.current_weather.weathercode,
        current_time: new Date(data.current_weather.time).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).slice(0,5),
        next_temp: data.hourly.temperature_2m[current_time_index+1],
        next_wind: data.hourly.windspeed_10m[current_time_index+1],
        next_time: new Date(data.hourly.time[current_time_index+1]).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).slice(0,5),
        next_next_temp: data.hourly.temperature_2m[current_time_index+2],
        next_next_wind: data.hourly.windspeed_10m[current_time_index+2],
        next_next_time: new Date(data.hourly.time[current_time_index+2]).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).slice(0,5),
      });
    }
  }, [data]);

  const getLocation = () => {
    const selectedLocation = Location.find(loc => loc.City === location);
    if (selectedLocation) {
      saveCity(location);
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
              <View style={styles.setRow}>
                <Text style={[styles.grayText, styles.timeText]}>{pickedData.current_time}</Text>
                <Text style={[styles.grayText, styles.timeText]}>{pickedData.next_time}</Text>
                <Text style={[styles.grayText, styles.timeText]}>{pickedData.next_next_time}</Text>
              </View>
            </View>

            <View style={styles.item2}>
              <View style={styles.setRow}>
                <Text style={[styles.whiteText, styles.Text30]}>{pickedData.current_temp}</Text>
                <Text style={[styles.whiteText, styles.Text30]}>{pickedData.next_temp}</Text>
                <Text style={[styles.whiteText, styles.Text30]}>{pickedData.next_next_temp}</Text>
              </View>
              <Text style={styles.unitText}>°C</Text>
            </View>

            <View style={styles.item2}>
              <View style={styles.setRow}>
                <Text style={[styles.whiteText, styles.Text30]}>{pickedData.current_wind}</Text>
                <Text style={[styles.whiteText, styles.Text30]}>{pickedData.next_wind}</Text>
                <Text style={[styles.whiteText, styles.Text30]}>{pickedData.next_next_wind}</Text>
              </View>
              <Text style={styles.unitText}>m/s</Text>
            </View>

            <View style={styles.item2}>
              <Text style={styles.whiteText}>Auringon nousu ja lasku huomenna</Text>
              <View style={styles.setRow}>
                <MCI name="weather-sunset-up" size={32} color="white" />
                <Text style={[styles.whiteText, styles.Text30]}>{sunrise}</Text>
                <Text style={[styles.whiteText, styles.Text30]}>{sunset}</Text>
                <MCI name="weather-sunset-down" size={32} color="white" />
              </View>
            </View>
          </View>
        </>
      }
    </View>
  );
}