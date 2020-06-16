import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    backgroundColor: "#09090b",
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  textHeader: {
    color: "#f5f5f5",
    fontFamily: "FiraCode",
    fontSize: 24,
  },
  park: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 140,
  },

  slotA: {
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderRightWidth: 0,
    borderWidth: 2,
    height: 73,
    justifyContent: "center",
    width: 105,
  },

  slotB: {
    alignItems: "center",
    borderColor: "#f5f5f5",
    borderLeftWidth: 0,
    borderWidth: 2,
    height: 73,
    justifyContent: "center",
    width: 105,
  },

  slotText: {
    color: "#f5f5f5",
    fontFamily: "FiraCode",
    fontSize: 14,
  },

  searchButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
    width: 50,
  },

  occupiedSlot: {
    alignItems: "center",
    backgroundColor: "#f5f5f54d",
    borderRadius: 8,
    height: 60,
    justifyContent: "center",
    width: 105,
  },

  image: {
    alignSelf: "flex-start",
    alignSelf: "center",
    transform: [{ rotate: "90deg" }],
  },
});
