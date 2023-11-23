import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  viewheader: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    justifyContent: 'space-evenly',
    height: 60,
    paddingTop: 5,
    borderBottomWidth: 2,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
