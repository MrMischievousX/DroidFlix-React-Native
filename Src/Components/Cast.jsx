//Imports
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "../Components/axios";
import api from "../../api";

//Constants
const url1 = "https://image.tmdb.org/t/p/w500";

export default function Cast({ id, which, mode }) {
  //States
  const [cast, setcast] = useState([]);
  const [Load, setLoad] = useState(false);
  const [Avail, setAvail] = useState(true);

  //Hooks
  const flatListRef = useRef();

  //Functions
  const castFnc = async () => {
    await axios
      .get(`/${which}/${id}/credits?api_key=${api}`)
      .then((data) => {
        if (data.data.cast == 0) setAvail(false);
        else {
          setcast(data.data.cast);
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
    cast: {
      width: 80,
      height: 80,
      borderRadius: 100,
      marginLeft: 10,
      resizeMode: "cover",
      borderWidth: 1,
      borderColor: mode ? "white" : "black",
    },
    castText: {
      color: mode ? "white" : "black",
      fontFamily: "Bebas",
      marginHorizontal: 10,
      marginBottom: 5,
      fontSize: 24,
      fontWeight: "bold",
    },
    view: {
      alignSelf: "flex-start",
      marginVertical: 20,
    },
  });

  //Main Function
  if (Load) {
    return (
      <View style={styles.view}>
        <Text style={styles.castText}> Cast </Text>
        <View style={{ flexDirection: "row" }}>
          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={cast.slice(0, 10)}
            renderItem={({ item }) => {
              const image = {
                uri: `${url1}${item.profile_path}`,
              };
              if (item.profile_path == null) return null;
              else {
                return (
                  <View style={{ overflow: "scroll" }}>
                    <Image source={image} style={styles.cast} />
                  </View>
                );
              }
            }}
          />
        </View>
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
