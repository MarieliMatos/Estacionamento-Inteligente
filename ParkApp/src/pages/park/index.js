import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import api from "../../services/api";
import styles from "./styles";

/*
  TODO:
    Quando a vaga estiver ocupada por um carro procurado pelo usuário, mostrar em destaque
*/
export default function Park() {
  const [fontLoad, setFontLoad] = useState(false);
  const [park, setPark] = useState("");
  const [userSlot, setUserSlot] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  // Função que navega até a tela de busca da placa
  // e envia os dados até a tela de busca
  function navigateToSearch() {
    navigation.navigate("Search", { param: park });
  }

  // Função que obtém os dados da API
  async function loadData() {
    const response = await api.get("park");
    setPark(response.data);
  }

  function printData(a, b) {
    const vagaA = a.vaga.toUpperCase();
    const vagaB = b.vaga.toUpperCase();

    let comparison = 0;
    if (vagaA > vagaB) {
      comparison = 1;
    } else if (vagaA < vagaB) {
      comparison = -1;
    }
    return comparison;
  }

  useEffect(() => {
    loadData();
  });

  // Recebe os parâmetros de Search e insere na variável userSlot
  useEffect(() => {
    if (route.params?.slotFound) {
      setUserSlot(route.params?.slotFound);
    }
  }, [route.params?.slotFound]);

  // Função que adiciona as fontes personalizadas
  async function getFonts() {
    await Font.loadAsync({
      // Load a font `Firacode` from a static resource
      FiraCode: require("../../assets/FiraCode-Regular.ttf"),
    });
  }

  if (fontLoad && park != "") {
    return (
      <View style={styles.container}>
        <Text style={styles.textHeader}>Setor A</Text>

        <View style={styles.park}>
          <View style={styles.section_a}>
            <View style={styles.slotA}>
              {/* Verifica se a vaga está ocupada */}
              {park[0].status && userSlot == park[0].vaga ? (
                <View style={styles.occupiedSlot}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/img/car.png")}
                  />
                </View>
              ) : park[0].status ? (
                <Image
                  style={styles.image}
                  source={require("../../assets/img/car.png")}
                />
              ) : (
                <Text style={styles.slotText}>{park[0].vaga}</Text>
              )}
            </View>
            <View style={styles.slotA}>
              {park[1].status && userSlot == park[1].vaga ? (
                <View style={styles.occupiedSlot}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/img/car.png")}
                  />
                </View>
              ) : park[1].status ? (
                <Image
                  style={styles.image}
                  source={require("../../assets/img/car.png")}
                />
              ) : (
                <Text style={styles.slotText}>{park[1].vaga}</Text>
              )}
            </View>
            <View style={styles.slotA}>
              {park[2].status && userSlot == park[2].vaga ? (
                <View style={styles.occupiedSlot}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/img/car.png")}
                  />
                </View>
              ) : park[2].status ? (
                <Image
                  style={styles.image}
                  source={require("../../assets/img/car.png")}
                />
              ) : (
                <Text style={styles.slotText}>{park[2].vaga}</Text>
              )}
            </View>
          </View>

          <View style={styles.section_b}>
            <View style={styles.slotB}>
              {park[3].status && userSlot == park[3].vaga ? (
                <View style={styles.occupiedSlot}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/img/car.png")}
                  />
                </View>
              ) : park[3].status ? (
                <Image
                  style={styles.image}
                  source={require("../../assets/img/car.png")}
                />
              ) : (
                <Text style={styles.slotText}>{park[3].vaga}</Text>
              )}
            </View>
            <View style={styles.slotB}>
              {park[4].status && userSlot == park[4].vaga ? (
                <View style={styles.occupiedSlot}>
                  <Image
                    style={styles.image}
                    source={require("../../assets/img/car.png")}
                  />
                </View>
              ) : park[4].status ? (
                <Image
                  style={styles.image}
                  source={require("../../assets/img/car.png")}
                />
              ) : (
                <Text style={styles.slotText}>{park[4].vaga}</Text>
              )}
            </View>
            <View style={styles.slotB}>
              <Text style={styles.slotText}>A06</Text>
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
