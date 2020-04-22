import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight + 20,
  },

  park: {
    paddingTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 5,
  },

  slots: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },

  slotsText: {
    fontSize: 15,
    color: '#41414d',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  slotsStatus: {
    fontSize: 12,
    color: '#737380',
    textAlign: 'center',
  },
});
