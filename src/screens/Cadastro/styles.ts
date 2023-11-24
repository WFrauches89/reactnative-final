import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d2424e0',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: '15%',
    marginBottom: '7%',
    paddingStart: '7%',
    paddingEnd: '7%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#97900e',
  },
  form: {
    flex: 1,
    backgroundColor: '#202020',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
});
