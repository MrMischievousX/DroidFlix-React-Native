import React, { useEffect, useState, useRef } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "./axios";
import axiosX from "axios";
import * as Font from "expo-font";

const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};

export default function Card({ title, fetchUrl, thumb, mode, navigation }) {
  //States
  let [movies, setmovies] = useState([]);
  const [Load, setload] = useState(false);
  const url = "https://image.tmdb.org/t/p/w500";
  const [count, setcount] = useState(1);

  //Hooks
  const flatListRef = useRef();
  const CancelToken = axiosX.CancelToken;
  const source = CancelToken.source();

  //Function
  async function getData(source) {
    try {
      let res = await axios.get(fetchUrl + count, {
        cancelToken: source.token,
      });
      let arr = movies.concat(res.data.results);
      setmovies(arr);
      setload(true);
    } catch (e) {
      if (axiosX.isCancel(e)) {
        console.log("cancelled");
      } else {
        throw e;
      }
    }
  }
  const toStart = () => {
    flatListRef.current?.scrollToIndex({ animated: true, index: 0 });
  };

  //On Mount
  useEffect(() => {
    getData(source);
    fetchFonts();
    toStart();
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    getData(source);
    return () => {
      source.cancel();
    };
  }, [count]);

  //Main Function
  if (Load) {
    return (
      <>
        <Text style={mode ? styles.textStyle : Light.textStyle}>{title}</Text>
        <FlatList
          ref={flatListRef}
          horizontal
          onEndReached={() => setcount(count + 1)}
          onEndReachedThreshold={0.7}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={movies}
          renderItem={({ item }) => {
            const image = {
              uri: `${url}${
                thumb
                  ? item.poster_path
                  : item.backdrop_path || item.poster_path
              }`,
            };
            if (!(item.backdrop_path && item.poster_path)) return null;
            else
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("CardDetail", {
                      data: item,
                      which: "tv",
                      mode: mode,
                    });
                  }}
                  style={
                    thumb
                      ? mode
                        ? styles.viewStyleThumb
                        : Light.viewStyleThumb
                      : mode
                      ? styles.viewStyle
                      : Light.viewStyle
                  }
                >
                  <Image
                    source={image}
                    style={mode ? styles.imageStyle : Light.imageStyle}
                  />
                </Pressable>
              );
          }}
        />
      </>
    );
  } else
    return (
      <>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, height: thumb ? 180 : 120, alignSelf: "center" }}
        />
      </>
    );
}

//Styles
const styles = StyleSheet.create({
  viewStyleThumb: {
    height: 180,
    width: 120,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  viewStyle: {
    overflow: "hidden",
    height: 120,
    width: 200,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 20,
    color: "white",
    marginLeft: 10,
    marginBottom: 4,
    fontFamily: "Bebas",
    letterSpacing: 1,
  },
  imageStyle: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    resizeMode: "cover",
  },
});

const Light = StyleSheet.create({
  viewStyleThumb: {
    height: 180,
    width: 120,
    marginHorizontal: 5,
    marginBottom: 10,
    overflow: "hidden",
  },

  viewStyle: {
    overflow: "hidden",
    height: 120,
    width: 200,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 20,
    color: "black",
    marginLeft: 10,
    marginBottom: 4,
    fontFamily: "Bebas",
    letterSpacing: 1,
  },
  imageStyle: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "black",
    flex: 1,
    resizeMode: "cover",
  },
});
