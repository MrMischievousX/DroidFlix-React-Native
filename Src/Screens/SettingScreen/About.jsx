//Import
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

//Export Function
export default function About({ route, navigation }) {
  const { current } = route.params;

  //Styles
  const styles = StyleSheet.create({
    textStart: {
      fontSize: 16,
      fontFamily: "sans-serif",
      marginBottom: 15,
      fontWeight: "600",
      color: current ? "#f4511e" : "red",
      letterSpacing: 0.5,
    },
    textMiddle: {
      fontSize: 20,
      fontFamily: "sans-serif",
      marginBottom: 1,
      fontWeight: "600",
      color: current ? "white" : "black",
      letterSpacing: 0.5,
    },
    textEnd: {
      fontSize: 18,
      fontFamily: "sans-serif",
      fontWeight: "600",
      color: current ? "grey" : "grey",
      letterSpacing: 0.5,
    },
    icon: {
      fontSize: 50,
      color: current ? "#f4511e" : "red",
    },
    akash: {
      fontSize: 30,
      fontFamily: "Bebas",
      letterSpacing: 1.3,
      textAlign: "center",
      marginTop: 30,
      marginBottom: 60,
      color: current ? "white" : "black",
    },
  });

  //Main Function
  return (
    <ScrollView
      style={{
        paddingTop: 30,
        flex: 1,
        backgroundColor: current ? "black" : "white",
      }}
    >
      <View style={{ marginLeft: 60, marginBottom: 30 }}>
        <Text style={styles.textStart}>Author</Text>
        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() => Linking.openURL("https://github.com/MrMischievousX")}
        >
          <Text style={styles.textMiddle}>Owner</Text>
          <Text style={styles.textEnd}>@MrMischievousX</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginBottom: 1 }}
          onPress={() => Linking.openURL("mailto:akashtureha123@gmail.com")}
        >
          <Text style={styles.textMiddle}>Send me an Email</Text>
          <Text style={styles.textEnd}>Want to give me a feedback</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomColor: current ? "white" : "black",
          borderBottomWidth: 1,
        }}
      />

      <View style={{ marginLeft: 60, marginTop: 30 }}>
        <Text style={styles.textStart}>App</Text>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <Text style={styles.textMiddle}>Package</Text>
          <Text style={styles.textEnd}>com.akash.DroidFlix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }}>
          <Text style={styles.textMiddle}>Version</Text>
          <Text style={styles.textEnd}>1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginBottom: 10 }}
          onPress={() =>
            Linking.openURL(
              "https://github.com/MrMischievousX/DroidFlix-React-Native"
            )
          }
        >
          <Text style={styles.textMiddle}>Report a bug</Text>
          <Text style={styles.textEnd}>
            Create an issue in the git repository
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 60,
            marginTop: 25,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://www.instagram.com/akash_tureha23/?hl=en")
            }
          >
            <AntDesign name="instagram" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://www.linkedin.com/in/akash-tureha-ba8b0214a/"
              )
            }
          >
            <AntDesign name="linkedin-square" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://github.com/MrMischievousX")}
          >
            <AntDesign name="github" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.akash}> Made with ❤️ Akash</Text>
    </ScrollView>
  );
}
