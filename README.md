# weather
An app for displaying info about the weather 

cities coordinates: https://fi.wikipedia.org/wiki/Luettelo_Suomen_kuntien_koordinaateista

TextInput value={location} onChangeText={setLocation} onSubmitEditing={getLocation} style={[styles.headerText, styles.cityInput]}
{time},
{data.current_weather.weathercode},
{data.current_weather.temperature},
{data.current_weather.windspeed},
{sunrise},
{sunset}