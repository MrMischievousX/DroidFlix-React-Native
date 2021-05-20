//Import
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import axiosX from "axios";
import Modal from "../../Components/Modal";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Export Function
export default function Search({ navigation, current }) {
  const [Dark, setmode] = useState(true);
  const [load, setload] = useState(false);
  const [text, setText] = useState("Harry Potter");
  const [Show, setshow] = useState(false);
  const [movies, setmovies] = useState([]);

  //Functions
  const search = async (text) => {
    const term = text.split(" ").join("%20");
    await axiosX
      .get(
        `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=15&order_by=desc&query_term=${term}`
      )
      .then((data) => {
        setmovies(data.data.data.movies);
        setshow(true);
      });
  };
  const List = ({ data, navigation }) => {
    return (
      <>
        <FlatList
          style={{ backgroundColor: current ? "black" : "white" }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => {
            const image = {
              uri: item.large_cover_image,
            };
            if (!item.large_cover_image) return null;
            else
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("DownloadDetail", {
                      data: item,
                      mode: Dark,
                    });
                  }}
                  style={styles.viewStyle}
                >
                  <Image source={image} style={styles.imageStyle} />
                </Pressable>
              );
          }}
        />
      </>
    );
  };

  //On mount
  useEffect(() => {
    setmode(current);
    search(text);
    return () => {};
  }, []);

  //Consoles

  //Styles
  const styles = StyleSheet.create({
    header: {
      paddingTop: 10,
      backgroundColor: current ? "black" : "white",
      alignItems: "center",
      flexDirection: "row",
    },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: current ? "white" : "black",
      height: 40,
      marginHorizontal: 30,
      marginTop: 15,
      paddingLeft: 10,
      fontSize: 18,
      color: current ? "white" : "black",
      letterSpacing: 1,
    },
    viewStyle: {
      overflow: "hidden",
      height: windowHeight / 3,
      width: windowWidth / 2.3,
      marginHorizontal: 10,
      marginTop: 20,
    },
    container: {
      height: "auto",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 30,
      paddingBottom: 100,
    },
    textStyle: {
      fontSize: 20,
      color: current ? "white" : "black",
      marginLeft: 10,
      marginBottom: 4,
      fontFamily: "Bebas",
      letterSpacing: 1,
    },
    imageStyle: {
      borderRadius: 10,
      borderWidth: 2,
      borderColor: current ? "white" : "black",
      flex: 1,
      resizeMode: "cover",
    },
  });

  //Main Function
  if (load) {
    return (
      <View style={{ backgroundColor: current ? "black" : "white", flex: 1 }}>
        <StatusBar />
        <View style={styles.header}>
          <Image
            style={{ width: 100, height: 30, marginLeft: 20 }}
            source={require("../../../assets/Logo.png")}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholderTextColor={current ? "white" : "black"}
            style={styles.input}
            placeholder="Harry Potter"
            onChangeText={(text) => setText(text)}
            onEndEditing={() => search(text)}
          />
        </View>
        <View style={styles.container}>
          {Show ? <List data={movies} navigation={navigation} /> : null}
        </View>
      </View>
    );
  } else {
    return <Modal setload={setload} mode={current} />;
  }
}
