import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';

import NumberBtn from './components/numberBtn';
import Guesshistory from './components/Guesshistory';

export default function App() {
  const [guess, setGuess] = React.useState(0);
  const [answer, SetAnswer] = React.useState(0);
  const [score, SetScore] = React.useState(0);
  const [history, Sethistory] = React.useState([]);


  React.useEffect(() => {
    SetAnswer(Math.floor(Math.random() * 10));
  }, []);

  async function guessNumber(guess) {

    setGuess(guess);
    Sethistory (history.concat(guess));

    if (guess == answer) {

      alert("You guessed it right!");

      SetScore(score + 1);
      SetAnswer(Math.floor(Math.random() * 9) + 1);
    } 

    else {
      if (guess < answer) {
        alert("You guessed it wrong, its higher!");
      } else {
        alert("You guessed it wrong, its lower!");
      }
      Vibration.vibrate(1000);
    }
  }


  return (
    <View style={styles.container}>

      <Text style={styles.scoreText}>Score: {score}</Text>

      <Text style={styles.infoText} >Guess a number from 1 to 9</Text>
      <View style={styles.Allbuttons}>
      <NumberBtn name="1" onPress={guessNumber}/>
      <NumberBtn name="2" onPress={guessNumber}/>
      <NumberBtn name="3" onPress={guessNumber}/>
      <NumberBtn name="4" onPress={guessNumber}/>
      <NumberBtn name="5" onPress={guessNumber}/>
      <NumberBtn name="6" onPress={guessNumber}/>
      <NumberBtn name="7" onPress={guessNumber}/>
      <NumberBtn name="8" onPress={guessNumber}/>
      <NumberBtn name="9" onPress={guessNumber}/>
      </View>
      <View>
        <Text style={styles.infoText}>Past guesses: </Text>
        <Guesshistory list={history}/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: 'white',
    fontSize: 30,
    marginBottom: 50
  },
  infoText: {
    color: 'white',
    fontSize: 15,
    marginBottom: 5
  },
  Allbuttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
