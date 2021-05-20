//Imports
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import AppLoading from "expo-app-loading";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Mainscreen(props) {
  //States
  const [Load, setload] = useState(true);

  setTimeout(() => {
    setload(false);
  }, 1000);

  //Main Function
  if (!Load) {
    return (
      <>
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={require("./assets/Login_large.jpg")}
          >
            <View style={styles.overlay} />
            <View style={styles.textView}>
              <Text style={styles.text}>Unlimited</Text>
              <Text style={styles.text}>entertainment,</Text>
              <Text style={styles.text}>Free of Cost.</Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 14,
                  letterSpacing: 0.5,
                  marginTop: 20,
                  marginBottom: 40,
                  textAlign: "center",
                }}
              >
                All of DroidFlix, Free for Everyone
              </Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    props.click(false);
                    props.Login(true);
                  }}
                >
                  <Text style={styles.ButtonView}>Get Started </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </>
    );
  } else {
    return <AppLoading />;
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  textView: {
    textAlign: "center",
    marginTop: windowHeight / 2,
    marginBottom: windowHeight / 8,
  },
  text: {
    color: "white",
    fontSize: 40,
    letterSpacing: 1,
    textAlign: "center",
  },
  ButtonView: {
    color: "white",
    fontSize: 20,
    letterSpacing: 1,
    textAlign: "center",
  },
  button: {
    color: "red",
    backgroundColor: "red",
    width: windowWidth / 1.2,
    height: 40,
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.3,
  },
});
