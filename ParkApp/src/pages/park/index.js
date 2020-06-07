import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import styles from "./styles";

/*
  TODO:
    Integração com a API
    Pegar do banco de dados as vagas ocupadas
    Mostrar em tela as vagas ocupadas

    Quando a vaga estiver ocupada por um carro procurado pelo usuário, mostrar em destaque
*/
export default function Park() {
  const [fontLoaded, setFontLoad] = useState(false);

  const navigation = useNavigation();

  function navigateToSearch() {
    navigation.navigate("Search");
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
        <Text style={styles.textHeader}>Setor 1</Text>

        <View style={styles.park}>
          <View style={styles.section_a}>
            <View style={styles.slotA}>
              <Text style={styles.slotText}>A01</Text>
            </View>
            <View style={styles.slotA}>
              <Text style={styles.slotText}>A02</Text>
            </View>
            <View style={styles.slotA}>
              <Text style={styles.slotText}>A03</Text>
            </View>
          </View>

          <View style={styles.section_b}>
            <View style={styles.slotB}>
              <Text style={styles.slotText}>B01</Text>
            </View>
            <View style={styles.slotB}>
              <Text style={styles.slotText}>B02</Text>
            </View>
            <View style={styles.slotB}>
              <Text style={styles.slotText}>B03</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={navigateToSearch}
        >
          <Feather name="search" size={30} color="#09090b" />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontLoad(true)} />
    );
  }
}
