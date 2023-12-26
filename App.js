import { View, StyleSheet, Platform } from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import Button from "./components/UI/Button";
import OutlinedButton from "./components/UI/OutlinedButton";

const dogSound = require("./assets/barking_dogs.wav");
const birdSound = require("./assets/bird.wav");
const horseSound = require("./assets/horse.wav");
const catSound = require("./assets/cat.wav");

export default function App() {
  const [sound, setSound] = useState();

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
      <View style={styles.buttonItem}>
        <Button onPress={() => playSound(birdSound)}>Bird Sound</Button>
      </View>
      <View style={styles.buttonItem}>
        <Button onPress={() => playSound(dogSound)}>Dog Sound</Button>
      </View>
      <View style={styles.buttonItem}>
        <Button onPress={() => playSound(horseSound)}>Horse Sound</Button>
      </View>
      <View style={styles.buttonItem}>
        <Button onPress={() => playSound(catSound)}>Cat Sound</Button>
      </View>
      <View style={styles.buttonItem}>
        <OutlinedButton icon="stop" onPress={stopSounds}>
          {" "}
          Stopp{" "}
        </OutlinedButton>
      </View>

      {/* <Button onPress={() => playSound(birdSound)}>Bird Sound</Button>
      <Button onPress={() => playSound(dogSound)}>Dog Sound</Button>
      <Button onPress={() => playSound(horseSound)}>Horse Sound</Button>
      <Button onPress={() => playSound(catSound)}>Cat Sound</Button>
      <OutlinedButton icon="stop" onPress={stopSounds}>
        {" "}
        Stopp{" "}
      </OutlinedButton> */}
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
  buttonItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 16,
  },
});
