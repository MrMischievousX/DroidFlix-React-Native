//Imports
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import axios from "../Components/axios";
import api from "../../api";

//Constants
const url = "https://image.tmdb.org/t/p/w500";

export default function Cast({ id, navigation, which, mode, pause }) {
  //States
  const [recommend, setrecommend] = useState([]);
  const [Load, setLoad] = useState(false);
  const [Avail, setAvail] = useState(true);

  //Hooks
  const flatListRef = useRef();

  //Functions
  const castFnc = async () => {
    await axios
      .get(`/${which}/${id}/recommendations?api_key=${api}`)
      .then((data) => {
        if (data.data.results == 0) setAvail(false);
        else {
          setrecommend(data.data.results);
          setLoad(true);
        }
      })
      .catch((err) => {
        setAvail(false);
      });
  };
  const toStart = () => {
    flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
  };

  //On Mount
  useEffect(() => {
    castFnc();
    toStart();
  }, [id]);

  //Styles
  const styles = StyleSheet.create({
    viewStyle: {
      overflow: "hidden",
      height: 120,
      width: 200,
      marginHorizontal: 5,
      marginBottom: 10,
    },
    castText: {
      color: mode ? "white" : "black",
      marginHorizontal: 10,
      marginBottom: 5,
      fontSize: 24,
      fontWeight: "bold",
      fontFamily: "Bebas",
    },
    view: {
      alignSelf: "flex-start",
      marginTop: 10,
      flex: 1,
    },
    imageStyle: {
      flex: 1,
      borderColor: mode ? "white" : "black",
      borderRadius: 20,
      borderWidth: 1,
      resizeMode: "cover",
    },
  });

  //Main Function
  if (Load) {
    return (
      <View style={styles.view}>
        <Text style={styles.castText}> Suggestions </Text>
        <FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={recommend.slice(0, 5)}
          renderItem={({ item }) => {
            const image = {
              uri: `${url}${item.backdrop_path || item.poster_path}`,
            };
            if (!(item.backdrop_path || item.poster_path)) return null;
            else
              return (
                <Pressable
                  onPress={() => {
                    pause(false);
                    navigation.navigate("CardDetail", { data: item });
                  }}
                  style={styles.viewStyle}
                >
                  <Image source={image} style={styles.imageStyle} />
                </Pressable>
              );
          }}
        />
      </View>
    );
  } else if (!Avail) {
    return null;
  } else {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, alignSelf: "center" }}
      />
    );
  }
}
