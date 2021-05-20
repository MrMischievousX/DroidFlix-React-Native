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
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import axiosX from "axios";
import * as Font from "expo-font";

//Constants
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//Functions
const fetchFonts = async () => {
  return Font.loadAsync({
    Bebas: require("../../assets/Fonts/Bebas.ttf"),
  });
};

export default function CardDetail({ route, navigation }) {
  //States
  const [Load, setload] = useState(false);
  const [suggestions, setsuggestions] = useState([]);

  //Hooks
  const scrollRef = useRef();

  //Constants
  const { data, mode } = route.params;
  const id = data.id;
  const Language = data.language;
  const title = data.title_english;
  const magnetTitle = title.split(" ").join("%20");
  const year = data.year;
  const rate = data.rating;
  const runtime = data.runtime;
  const poster = data.large_cover_image || data.medium_cover_image;
  const genre = data.genres;
  const overview = data.description_full;
  const _720p = data.torrents.filter((torrent) => torrent.quality == "720p");
  const _1080p = data.torrents.filter((torrent) => torrent.quality == "1080p");
  const magnet720p = `magnet:?xt=urn:btih:${_720p[0].hash}&dn=${magnetTitle}&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2880%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337`;
  const magnet1080p = `magnet:?xt=urn:btih:${_1080p[0].hash}&dn=${magnetTitle}&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2880%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fglotorrents.pw%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftorrent.gresille.org%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fp4p.arenabg.ch%3A1337&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337`;

  //Functions
  const search = async (source) => {
    try {
      await axiosX
        .get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`, {
          cancelToken: source.token,
        })
        .then((data) => {
          setsuggestions(data.data.data.movies);
          setTimeout(() => {
            setload(true);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setTimeout(() => {
            setload(true);
          }, 1000);
        });
    } catch (e) {
      setTimeout(() => {
        setload(true);
      }, 1000);
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
  const List = ({ data, navigation }) => {
    return (
      <>
        <Text style={styles.SuggestionsText}> Suggestions </Text>
        <FlatList
          style={{ backgroundColor: mode ? "black" : "white" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item }) => {
            const image = {
              uri: item.large_cover_image || item.medium_cover_image,
            };
            if (!(item.large_cover_image || item.medium_cover_image))
              return null;
            else
              return (
                <Pressable
                  onPress={() => {
                    setload(false);
                    navigation.navigate("DownloadDetail", {
                      data: item,
                      mode: mode,
                    });
                  }}
                  style={styles.viewStyleSuggestions}
                >
                  <Image source={image} style={styles.imageStyle} />
                </Pressable>
              );
          }}
        />
      </>
    );
  };

  //On Mount
  useEffect(() => {
    const CancelToken = axiosX.CancelToken;
    const source = CancelToken.source();
    search(source);
    onPressTouch();
    return () => {
      source.cancel();
    };
  }, [data]);
  useEffect(() => {
    fetchFonts();
  }, []);

  //Consoles

  //Styles
  const styles = StyleSheet.create({
    SuggestionsText: {
      fontFamily: "sans-serif",
      color: mode ? "white" : "black",
      marginHorizontal: 10,
      alignSelf: "flex-start",
      marginBottom: 10,
      fontSize: 24,
      fontWeight: "600",
    },
    viewStyleSuggestions: {
      overflow: "hidden",
      height: 120,
      width: 200,
      marginHorizontal: 5,
      marginBottom: 10,
    },
    imageStyle: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: mode ? "white" : "black",
      flex: 1,
      resizeMode: "cover",
    },
    arrow: {
      zIndex: 2,
      fontSize: 35,
      width: 35,
      height: 35,
      color: !mode ? "black" : "white",
      position: "absolute",
      elevation: 31,
      marginLeft: 10,
      marginTop: 10,
      overflow: "hidden",
      backgroundColor: !mode ? "white" : "black",
      borderRadius: 35,
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
      marginHorizontal: 25,
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
                source={{ uri: poster }}
                style={styles.image}
              ></ImageBackground>
            </View>
            <View style={styles.posterContain}>
              <Image
                source={{ uri: poster }}
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
              <Text style={styles.movieTitle}>{title}</Text>
              <Text style={styles.genreTitle}>
                {genre[0] || null}
                {"  "} {genre[1] || null} {"  "}
                {genre[2] || null}
                {"  "}
                {genre[3] || null}
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
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 10,
                  width: windowWidth / 2.3,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    padding: 2,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(magnet720p).catch(function (err) {
                      Alert.alert(
                        "Torrent Downloader is Missing",
                        "Install Utorrent to proceed."
                      );
                    });
                  }}
                >
                  <Feather name="download" size={24} color="#2196F3" />
                  <Text
                    style={{
                      color: mode ? "white" : "black",
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    720p
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 2,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(magnet1080p).catch(function (err) {
                      Alert.alert(
                        "Torrent Downloader is Missing",
                        "Install Utorrent to proceed."
                      );
                    });
                  }}
                >
                  <Feather name="download" size={24} color="#2196F3" />
                  <Text
                    style={{
                      color: mode ? "white" : "black",
                      marginLeft: 5,
                      fontWeight: "bold",
                    }}
                  >
                    1080p
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
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
              <Text style={styles.overview}>{overview}</Text>
            </View>
            <View
              style={{
                borderBottomColor: mode ? "white" : "black",
                borderBottomWidth: 1,
                marginBottom: 20,
                width: windowWidth / 1.3,
              }}
            />
            <List data={suggestions} navigation={navigation} />
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
