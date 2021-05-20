//Imports
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import axios from "./axios";
import axiosX from "axios";
import * as Font from "expo-font";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Function
const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};

export default function Card({ fetchUrl, mode, navigation }) {
  //States
  let [movies, setmovies] = useState([]);
  const [Load, setload] = useState(false);
  const [Current, setCurrent] = useState(0);
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

  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    try {
      setCurrent(viewableItems[0].index);
    } catch (e) {}
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 65,
  };

  //Main Function
  if (Load) {
    return (
      <>
        <View style={{ marginTop: 10 }} />
        <FlatList
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          horizontal
          onEndReached={() => setcount(count + 1)}
          onEndReachedThreshold={0.7}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={movies}
          renderItem={({ item, index }) => {
            const image = {
              uri: `${url}${item.backdrop_path}`,
            };
            if (!(item.backdrop_path && item.poster_path)) return null;
            else
              return (
                <Pressable
                  onPress={() => {
                    if (Current == index)
                      navigation.navigate("CardDetail", {
                        data: item,
                        which: "movie",
                      });
                  }}
                  style={
                    mode
                      ? Current == index
                        ? styles.viewStyle1
                        : styles.viewStyle2
                      : Current == index
                      ? Light.viewStyle1
                      : Light.viewStyle2
                  }
                >
                  <Image
                    source={image}
                    style={mode ? styles.imageStyle : Light.imageStyle}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={mode ? styles.textStyle : Light.textStyle}
                  >
                    {item.title}
                  </Text>
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
          style={{ flex: 1, height: 180, alignSelf: "center" }}
        />
      </>
    );
}

//Styles
const styles = StyleSheet.create({
  viewStyle1: {
    height: windowHeight / 3.3,
    width: windowWidth / 1.2,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Bebas",
    color: "white",
  },
  viewStyle2: {
    alignSelf: "center",
    height: windowHeight / 3.7,
    width: windowWidth / 1.2,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  imageStyle: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    flex: 1,
    resizeMode: "cover",
  },
});
const Light = StyleSheet.create({
  viewStyle1: {
    height: windowHeight / 3.3,
    width: windowWidth / 1.2,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Bebas",
    color: "black",
  },
  viewStyle2: {
    alignSelf: "center",
    height: windowHeight / 3.7,
    width: windowWidth / 1.2,
    marginHorizontal: 10,
    marginBottom: 40,
  },
  imageStyle: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    flex: 1,
    resizeMode: "cover",
  },
});
