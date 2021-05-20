//Imports
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import axios from "../Components/axios";
import * as Font from "expo-font";
import Cast from "./Cast";
import ScreenShots from "./ScreenShots";
import Suggestions from "./Suggestions";
import Similar from "./Similar";
import Posters from "./Posters";
import axiosX from "axios";
import api from "../../api";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const url1 = "https://image.tmdb.org/t/p/original";
const url2 = "https://image.tmdb.org/t/p/w500";

//Functions
const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};

export default function CardDetail({ route, navigation }) {
  //States
  const [genre, setgenre] = useState([
    {
      name: "Action",
    },
    {
      name: "Adventure",
    },
  ]);
  const [Load, setload] = useState(false);
  const [rate, setrate] = useState(8);
  const [runtime, setruntime] = useState(120);
  const [year, setyear] = useState(2012);
  const [same, setsame] = useState(true);

  //Hooks
  const scrollRef = useRef();

  //Constants
  const { data, which, mode } = route.params;
  const Language = data.original_language;
  const id = data.id;
  const image = {
    uri: `${url1}${data.backdrop_path || data.poster_path}`,
  };
  const PosterImage = {
    uri: `${url2}${data.poster_path}`,
  };

  //Functions
  const GetAll = async (source) => {
    try {
      await axios
        .get(`/${which}/${id}?api_key=${api}`, { cancelToken: source.token })
        .then((movie1) => {
          if (data.backdrop_path != movie1.data.backdrop_path) setsame(false);
          if (movie1.data.genres.length > 1) {
            setgenre(movie1.data.genres);
            setruntime(movie1.data.runtime);
          }
          setrate(data.vote_average);
          setyear(
            data.first_air_date
              ? data.first_air_date.slice(0, 4)
              : data.release_date.slice(0, 4)
          );
          setTimeout(() => {
            setload(true);
          }, 1000);
        })
        .catch((err) => {
          setTimeout(() => {
            setload(true);
          }, 1000);
        });
    } catch (e) {
      setload(true);
      if (axiosX.isCancel(e)) {
        console.log("cancelled");
      } else {
        throw e;
      }
    }
  };
  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const Details = ({ check, mode }) => {
    if (check)
      return (
        <>
          <Cast id={id} which={which} mode={mode} />
          <Posters id={id} which={which} mode={mode} />
          <ScreenShots id={id} which={which} mode={mode} />
          <Similar
            id={id}
            navigation={navigation}
            which={which}
            mode={mode}
            pause={setload}
          />
          <Suggestions
            id={id}
            navigation={navigation}
            which={which}
            mode={mode}
            pause={setload}
          />
        </>
      );
    else return null;
  };

  //On Mount
  useEffect(() => {
    setTimeout(() => {
      setload(true);
    }, 1000);
    onPressTouch();
  }, [data]);
  useEffect(() => {
    const CancelToken = axiosX.CancelToken;
    const source = CancelToken.source();
    fetchFonts();
    GetAll(source);
    return () => {
      source.cancel();
    };
  }, []);

  //Consoles

  //Styles
  const styles = StyleSheet.create({
    arrow: {
      zIndex: 2,
      fontSize: 35,
      width: 35,
      height: 36,
      color: !mode ? "black" : "white",
      position: "absolute",
      elevation: 31,
      marginLeft: 10,
      marginTop: 10,
      backgroundColor: !mode ? "white" : "black",
      borderRadius: 100,
    },
    playButton: {
      elevation: 31,
      bottom: -15,
      overflow: "hidden",
      backgroundColor: "white",
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "white",
      textAlignVertical: "center",
      textAlign: "center",
      zIndex: 1,
    },
    yearStyle: {
      width: 80,
      height: 40,
      marginHorizontal: 10,
    },
    overview: {
      color: !mode ? "grey" : "white",
      lineHeight: 20,
      marginVertical: 15,
      textAlign: "center",
      marginHorizontal: 35,
      fontSize: 16,
    },
    yearTextStyle: {
      color: !mode ? "#221F22" : "white",
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
    },
    yearTextTitleStyle: {
      color: !mode ? "grey" : "white",
      fontSize: 16,
      textAlign: "center",
      fontWeight: "700",
    },
    viewStyle: {
      alignItems: "center",
    },
    image: {
      width: windowWidth,
      height: windowHeight / 1.8,
      resizeMode: "cover",
    },
    contain: {
      width: windowWidth * 1.5,
      height: windowHeight / 2.219,
      height: 350,
      alignItems: "center",
      borderBottomLeftRadius: 1000,
      borderBottomRightRadius: 1000,
      overflow: "hidden",
      elevation: 29,
      backgroundColor: !mode ? "white" : "black",
    },
    posterContain: {
      overflow: "hidden",
      position: "absolute",
      width: 120,
      height: 170,
      top: 220,
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 30,
      elevation: 30,
      backgroundColor: "white",
    },
    detailContainer: {
      marginTop: 30,
      alignItems: "center",
    },
    movieTitle: {
      color: !mode ? "#221F22" : "white",
      fontSize: 28,
      textAlign: "center",
      letterSpacing: 1,
      marginHorizontal: 50,
      fontFamily: "Bebas",
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    genreTitle: {
      letterSpacing: 1,
      fontSize: 18,
      marginHorizontal: 50,
      marginTop: 5,
      color: !mode ? "#221F22" : "white",
      fontFamily: "Bebas",
      textAlign: "center",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  });

  //Main Function
  if (Load) {
    return (
      <>
        <Feather
          name="arrow-left-circle"
          style={styles.arrow}
          onPress={() => navigation.goBack()}
        />
        <ScrollView
          style={{ backgroundColor: mode ? "black" : "white" }}
          ref={scrollRef}
        >
          <View style={styles.viewStyle}>
            <View style={styles.contain}>
              <ImageBackground
                source={image}
                style={styles.image}
              ></ImageBackground>
            </View>
            <View style={styles.posterContain}>
              <Image
                source={PosterImage}
                style={{
                  flex: 1,
                  resizeMode: "cover",
                }}
              />
            </View>
            <AntDesign
              name="play"
              size={40}
              color="red"
              style={styles.playButton}
              onPress={() => console.log("pressed")}
            />
            <View style={styles.detailContainer}>
              <Text style={styles.movieTitle}>
                {data?.name ||
                  data?.title ||
                  data?.titlename ||
                  data?.original_name}
              </Text>
              <Text style={styles.genreTitle}>
                {genre[0].name}, {genre[1].name}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name={
                    rate > 1 ? "star" : rate === 0 ? "star-o" : "star-half-full"
                  }
                  size={28}
                  color="red"
                />
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name={
                    rate > 3
                      ? "star"
                      : rate <= 2 && rate < 3
                      ? "star-o"
                      : "star-half-full"
                  }
                  size={28}
                  color="red"
                />
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name={
                    rate > 5
                      ? "star"
                      : rate <= 4 && rate < 5
                      ? "star-o"
                      : "star-half-full"
                  }
                  size={28}
                  color="red"
                />
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name={
                    rate > 7
                      ? "star"
                      : rate <= 6 && rate < 7
                      ? "star-o"
                      : "star-half-full"
                  }
                  size={28}
                  color="red"
                />
                <FontAwesome
                  style={{ marginRight: 5 }}
                  name={
                    rate > 9
                      ? "star"
                      : rate <= 8 && rate < 9
                      ? "star-o"
                      : "star-half-full"
                  }
                  size={28}
                  color="red"
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={styles.yearStyle}>
                  <Text style={styles.yearTextTitleStyle}>Year</Text>
                  <Text style={styles.yearTextStyle}>{year}</Text>
                </View>
                <View style={styles.yearStyle}>
                  <Text style={styles.yearTextTitleStyle}>Language</Text>
                  <Text
                    style={{
                      ...styles.yearTextStyle,
                      textTransform: "uppercase",
                    }}
                  >
                    {Language}
                  </Text>
                </View>
                <View style={styles.yearStyle}>
                  <Text style={styles.yearTextTitleStyle}>Length</Text>
                  <Text style={styles.yearTextStyle}>{runtime} min</Text>
                </View>
              </View>
              <Text style={styles.overview}>{data.overview}</Text>
            </View>
            <View
              style={{
                borderBottomColor: mode ? "white" : "black",
                borderBottomWidth: 1,
                marginBottom: 20,
                width: windowWidth / 1.3,
              }}
            />
            <Details check={same} mode={mode} />

            {/*  */}
          </View>
        </ScrollView>
      </>
    );
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
