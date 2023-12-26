import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const dogSound = require("./assets/barking_dogs.wav");
const birdSound = require("./assets/bird.wav");
const horseSound = require("./assets/horse.wav");
const catSound = require("./assets/cat.wav");

export default function App() {
  const [sound, setSound] = useState();
  // const [soundUrl, setsoundUrl] = useState();

  async function playSound(arg) {
    console.log("Loading Sound");
    const test = arg || "";
    const { sound } = await Audio.Sound.createAsync(test);
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  function stopSounds() {
    sound.unloadAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Bird Sound" onPress={() => playSound(birdSound)} />
      <Button title="Play Dog Sound" onPress={() => playSound(dogSound)} />
      <Button title="Play Horse Sound" onPress={() => playSound(horseSound)} />
      <Button title="Play Cat Sound" onPress={() => playSound(catSound)} />
      <Button title="Stop" onPress={stopSounds} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
