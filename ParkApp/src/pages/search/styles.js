import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e4",
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    height: 35,
    justifyContent: "center",
    width: 35,
  },

  input: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 8,
    fontSize:14,
    fontFamily:'FiraCode',
    height: 50,
    marginTop: 100,
    width: 250,
  },

  searchButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#09090b",
    borderRadius: 8,
    flexDirection: "row",
    height: 45,
    justifyContent: "space-evenly",
    marginHorizontal: 80,
    marginTop: 60,
    width: 220,
  },

  textButton: {
    color: "#ffff",
    fontFamily: "FiraCode",
    fontSize: 18,
  },
});
