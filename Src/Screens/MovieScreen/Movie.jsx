//Imports
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  StatusBar,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import MovieCard from "../../Components/MovieCard";
import MovieMainCard from "../../Components/MovieMainCard";
import request from "../../Components/request";

export default function Homescreen({ navigation, current }) {
  //States
  const [Load, setload] = useState(false);
  const [Dark, setmode] = useState(true);

  //Functions
  async function getData() {
    console.log("Getting");
    setload(true);
  }

  //Constants

  //OnMount
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setmode(current);
  }, [current]);

  //Console Logs

  //Main Function
  if (Load) {
    return (
      <>
        <StatusBar />
        <View style={Dark ? styles.header : Light.header}>
          <Image
            style={{ width: 100, height: 30, marginLeft: 20 }}
            source={require("../../../assets/Logo.png")}
          />
        </View>
        <ScrollView style={{ backgroundColor: Dark ? "black" : "white" }}>
          <MovieMainCard
            mode={Dark}
            fetchUrl={request.fetchPopular}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Action Movies"
            fetchUrl={request.fetchActionMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Horror Movies"
            fetchUrl={request.fetchHorrorMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Adventure Movies"
            fetchUrl={request.fetchAdventureMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Romantic Movies"
            fetchUrl={request.fetchRomanceMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Thriller Movies"
            fetchUrl={request.fetchTrillerMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Fantasy Movies"
            fetchUrl={request.fetchFantasyMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Comedy Movies"
            fetchUrl={request.fetchComedyMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Science Fiction Movies"
            fetchUrl={request.fetchScienceFiction}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Mystery Movies"
            fetchUrl={request.fetchMysteryMovie}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Animation Movies"
            fetchUrl={request.fetchAnimationMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Crime Movies"
            fetchUrl={request.fetchCrimeMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Drama Movies"
            fetchUrl={request.fetchDrameMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="War Movies"
            fetchUrl={request.fetchWarMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Western Movies"
            fetchUrl={request.fetchWesternMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="Family Movies"
            fetchUrl={request.fetchFamilyMovies}
            navigation={navigation}
          />
          <MovieCard
            mode={Dark}
            title="History Movies"
            fetchUrl={request.fetchHistory}
            navigation={navigation}
          />
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

//Styles
const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  play: {
    flexDirection: "row",
    width: 85,
    height: 30,
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    left: 10,
    marginVertical: 7,
  },
  playText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  plus: {
    width: "70%",
    height: "auto",
    left: 20,
    top: "25%",
    zIndex: 100,
  },
  plusTitle: {
    marginTop: 20,
    color: "white",
    fontSize: 26,
    fontWeight: "700",
  },
  plusText: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    lineHeight: 20,
  },
  overlay: {
    position: "absolute",
    height: 30,
    right: 0,
    bottom: -2,
    left: 0,
  },
  overlaytop: {
    position: "absolute",
    height: 30,
    right: 0,
    top: 0,
    left: 0,
  },
});

const Light = StyleSheet.create({
  header: {
    paddingTop: 5,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
  },
  play: {
    flexDirection: "row",
    width: 85,
    height: 30,
    borderRadius: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    left: 10,
    marginVertical: 7,
  },
  playText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
  },
  plus: {
    width: "70%",
    height: "auto",
    left: 20,
    top: "25%",
    zIndex: 100,
  },
  plusTitle: {
    marginTop: 20,
    color: "white",
    fontSize: 26,
    fontWeight: "700",
  },
  plusText: {
    color: "white",
    marginTop: 5,
    fontSize: 16,
    lineHeight: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    height: 20,
    right: 0,
    bottom: -2,
    left: 0,
  },
  overlaytop: {
    position: "absolute",
    height: 30,
    right: 0,
    top: 0,
    left: 0,
  },
});
