import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import styles from "./styles";

export default function Search() {
  const [fontLoaded, setFontLoad] = useState(false);
  const [plateInput, setPlateInput] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {param} = route.params;

  function navigateBack() {
    navigation.goBack();
  }

  async function getFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      FiraCode: require("../../assets/FiraCode-Regular.ttf"),
    });
  }

  function searchPlate(){
    let found = param.find(param => param.placa === plateInput);
    if (found === undefined){
      return(Alert.alert("Veículo não encontrado"));    
    } else {
      navigation.navigate("park", {slotFound: found.vaga});
    }
  }

  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <View>
          {/* Botão de volta à página do estacionamento */}
          <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
            <Feather name="arrow-left" size={25} color="#09090b" />
          </TouchableOpacity>
          {/* Fomulário para inserir a placa do carro */}
          <TextInput
            style={styles.input}
            placeholder="Insira a placa do seu carro"
            onChangeText={plateInput => setPlateInput(plateInput)}
            defaultValue={plateInput}
          />
          {/* Botão de busca da placa */}
          <TouchableOpacity style={styles.searchButton} onPress={searchPlate}>
            <Feather name="search" size={25} color="#ffff" />
            <Text style={styles.textButton}>Procurar carro</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontLoad(true)} />
    );
  }
}
