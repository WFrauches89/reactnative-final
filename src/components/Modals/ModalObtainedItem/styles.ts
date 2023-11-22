import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#5c4a46',
  },
  closeModal: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 100,
  },
  chestGif: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginTop: 20,
  },
  titleItemName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'grey',
    marginBottom: 40,
  },
  titleContinue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  loadingItemContainer: {
    height: 90,
  },
});
