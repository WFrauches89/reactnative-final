import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewheader: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    flexDirection: 'row',
    backgroundColor: '#2c2c2c',
    justifyContent: 'space-evenly',
    height: 60,
    padding: 8,
    borderBottomWidth: 2,
  },
  buttonSair: {
    paddingHorizontal: 2,
  },
  imagSair: {
    width: 50,
    height: 50,
    margin: 2,
    padding: 5,
  },
});
