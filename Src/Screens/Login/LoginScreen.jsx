//Imports
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function LoginScreen({ Login, status, current }) {
  //States
  const [register, setregister] = useState(true);
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  //Functions
  const validationRegister = () => {
    let check = true;
    if (password.length < 6) {
      Alert.alert("Password length should be more than 6 letters");
      check = false;
    }
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      console.log(email);
    } else {
      Alert.alert("You have entered an invalid email address!");
      check = false;
    }
    if (name.length < 1) {
      Alert.alert("Enter name");
      check = false;
    }
    if (check) {
      Login(false);
      status("Login");
    }
  };
  const validationSigin = () => {
    let check = true;
    if (password.length < 6) {
      Alert.alert("Password length should be more than 6 letters");
      check = false;
    }
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      console.log(email);
    } else {
      Alert.alert("You have entered an invalid email address!");
      check = false;
    }
    if (check) {
      Login(false);
      status("Login");
    }
  };

  //styles
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      backgroundColor: current ? "#2C2C2C" : "#ebf6f7",
      width: windowWidth / 1.4,
      height: windowHeight / 11,
      borderRadius: 10,
      paddingLeft: 10,
      marginBottom: 3,
      fontSize: 18,
      color: current ? "white" : "black",
      letterSpacing: 1,
      fontFamily: "sans-serif",
    },
    text: {
      color: current ? "white" : "black",
      fontFamily: "sans-serif",
      fontSize: 20,
      alignSelf: "flex-end",
      marginRight: 20,
      marginTop: 10,
    },
    btntext: {
      color: current ? "white" : "black",
      fontFamily: "sans-serif",
      fontSize: 20,
    },
    signtext: {
      color: current ? "#ebf6f7" : "black",
      fontFamily: "sans-serif",
      fontSize: 16,
      fontWeight: "600",
      marginTop: 20,
      textAlign: "center",
    },
    button: {
      width: windowWidth / 2,
      height: windowHeight / 15,
      alignItems: "center",
      borderRadius: 10,
      marginTop: 30,
      justifyContent: "center",
      borderWidth: 0.5,
      backgroundColor: current ? "black" : "#eaf4fc",
      borderColor: current ? "grey" : "black",
    },
  });

  //Main Function
  return (
    <>
      <View
        style={{
          paddingTop: 20,
          backgroundColor: current ? "black" : "white",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={styles.text}
          onPress={() => {
            setemail("");
            setname("");
            setpassword("");
            setregister(!register);
          }}
        >
          {register ? "SIGN IN" : "REGISTER"}
        </Text>
        <Image
          style={{
            width: windowWidth / 1.5,
            height: windowHeight / 11,
            marginTop: windowHeight / 10,
          }}
          source={require("../../../assets/Logo.png")}
        />

        {register ? (
          <View
            style={{
              marginTop: StatusBar.currentHeight,
              paddingTop: 30,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholderTextColor={current ? "white" : "black"}
              style={styles.input}
              placeholder="Name"
              onChangeText={setname}
              value={name}
            />
            <TextInput
              placeholderTextColor={current ? "white" : "black"}
              style={styles.input}
              placeholder="Email"
              onChangeText={setemail}
              value={email}
            />
            <TextInput
              secureTextEntry={true}
              placeholderTextColor={current ? "white" : "black"}
              style={styles.input}
              placeholder="Password"
              onChangeText={setpassword}
              value={password}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                validationRegister();
              }}
            >
              <Text style={styles.btntext}>Register</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              marginTop: StatusBar.currentHeight,
              paddingTop: 30,
              alignItems: "center",
            }}
          >
            <TextInput
              placeholderTextColor={current ? "white" : "black"}
              style={styles.input}
              placeholder="Email"
              onChangeText={setemail}
              value={email}
            />
            <TextInput
              secureTextEntry={true}
              placeholderTextColor={current ? "white" : "black"}
              style={styles.input}
              placeholder="Password"
              onChangeText={setpassword}
              value={password}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                validationSigin();
              }}
            >
              <Text style={styles.btntext}>Sign In</Text>
            </TouchableOpacity>
            <Text
              style={styles.signtext}
              onPress={() => setregister(!register)}
            >
              Sign Up for free!
            </Text>
          </View>
        )}
      </View>
    </>
  );
}
