//Import
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

//Export Function
export default function Settings({ click, dark, current, navigation, status }) {
  //States
  const [chng, setchng] = useState(false);

  //Styles
  const styles = StyleSheet.create({
    switch: {
      color: current ? "white" : "black",
    },
    switchText: {
      fontFamily: "sans-serif",
      fontSize: 24,
      marginLeft: 5,
      fontWeight: "600",
      color: current ? "white" : "black",
    },
  });

  //Main Function
  return (
    <View
      style={{
        backgroundColor: current ? "black" : "white",
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 20,
        }}
        onPress={() => {
          status("Logout");
          click(true);
        }}
      >
        <AntDesign name="logout" size={28} style={styles.switch} />
        <Text style={styles.switchText}> Logout </Text>
      </TouchableOpacity>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome5 name="palette" size={28} style={styles.switch} />
          <Text style={styles.switchText}> Light mode </Text>
        </View>
        <MaterialCommunityIcons
          style={styles.switch}
          name={chng ? "toggle-switch" : "toggle-switch-off"}
          size={70}
          onPress={() => {
            dark(!current);
            click(true);
            setchng(!chng);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 10,
        }}
        onPress={() =>
          navigation.navigate("About", {
            current: current,
          })
        }
      >
        <MaterialIcons name="info-outline" style={styles.switch} size={28} />
        <Text style={styles.switchText}> About </Text>
      </TouchableOpacity>
    </View>
  );
}
