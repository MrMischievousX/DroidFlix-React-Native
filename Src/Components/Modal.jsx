//Import
import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

const App = ({ setload, mode }) => {
  //Styles
  const styles = StyleSheet.create({
    centeredViewAll: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    centeredView: {
      backgroundColor: mode ? "black" : "white",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      height: 300,
      margin: 20,
      backgroundColor: mode ? "black" : "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: mode ? "white" : "black",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 100,
    },
    button: {
      borderRadius: 20,
      paddingVertical: 8,
      paddingHorizontal: 15,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: mode ? "white" : "white",
      fontWeight: "600",
      letterSpacing: 1,
      fontFamily: "sans-serif",
      fontSize: 20,
      textAlign: "center",
    },
    modalText: {
      color: mode ? "white" : "black",
      flex: 1,
      marginBottom: 15,
      fontSize: 18,
      textAlign: "center",
      fontFamily: "sans-serif",
    },
  });

  //Main function
  return (
    <View style={styles.centeredViewAll}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              It is recommended to use wifi as some network wont support
              downloads (Illegal) also make sure to have a torrent downloader to
              download the movies
              {"\n"}
              Enjoy Streaming !!!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setload(true)}
            >
              <Text style={styles.textStyle}> Agree </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default App;
