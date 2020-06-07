import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import styles from "./styles";

/*
  TODO:
    Quando o usuário buscar por uma placa buscar na API por uma incidencia
    Se a placa está cadastrada no BD retornar a tela inicial com a placa
    Se a placa não está no banco de dados mostar um aviso ao usuário
*/

export default function Search() {
  const [fontLoaded, setFontLoad] = useState(false);
  const [plateInput, setPlateInput] = useState('');

  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  async function getFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      FiraCode: require("../../assets/FiraCode-Regular.ttf"),
    });
  }

  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
            <Feather name="arrow-left" size={25} color="#09090b" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Insira a placa do seu carro"
            onChangeText={plateInput => setPlateInput(plateInput)}
            defaultValue={plateInput}
          />

          <TouchableOpacity style={styles.searchButton} onPress={() => {console.log(plateInput)}}>
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
