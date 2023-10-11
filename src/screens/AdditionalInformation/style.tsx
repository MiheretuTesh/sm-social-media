import {StyleSheet} from 'react-native';
import Metrics from '../../constants/Metrics';

export const styles = StyleSheet.create({
  container: {
    padding: Metrics.measure(16),
  },
  headerText: {
    textAlign: 'center',
    fontSize: Metrics.measure(18),
    marginTop: Metrics.measure(20),
    color: '#333',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: Metrics.measure(12),
    padding: Metrics.measure(16),
    marginTop: Metrics.measure(16),
  },
  sectionHeaderText: {
    fontSize: Metrics.measure(16),
    fontWeight: 'bold',
    marginBottom: Metrics.measure(8),
  },
  dropdownContainer: {
    marginTop: Metrics.measure(16),
  },
  //   dropdown: {
  //     height: 50,
  //     backgroundColor: 'white',
  //     borderRadius: 12,
  //     padding: 12,
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 1,
  //     },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 1.41,
  //     color: 'black',
  //     elevation: 2,
  //   },
  dropdownTitle: {
    fontSize: Metrics.measure(14),
    fontWeight: 'bold',
  },
  input: {
    borderWidth: Metrics.measure(1),
    borderColor: '#969BA1',
    padding: Metrics.measure(10),
    marginBottom: Metrics.measure(10),
    borderRadius: Metrics.measure(12),
    color: '#333',
  },
  //   inputSearchStyle: {
  //     height: 40,
  //     fontSize: 16,
  //   },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.measure(10),
  },
  date: {
    borderWidth: Metrics.measure(1),
    borderColor: '#969BA1',
    padding: Metrics.measure(10),
    marginBottom: Metrics.measure(10),
    borderRadius: Metrics.measure(12),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.measure(10),
    marginBottom: Metrics.measure(10),
  },
  button: {
    width: Metrics.measure(30),
    borderRadius: Metrics.measure(10),
    padding: Metrics.measure(8),
    backgroundColor: '#E51D43',
    color: 'black',
  },

  dropdown: {
    margin: Metrics.measure(16),
    height: Metrics.measure(50),
    borderBottomColor: 'gray',
    borderBottomWidth: Metrics.measure(0.5),
  },
  icon: {
    marginRight: Metrics.measure(5),
  },
  placeholderStyle: {
    fontSize: Metrics.measure(16),
  },
  selectedTextStyle: {
    fontSize: Metrics.measure(16),
  },
  iconStyle: {
    width: Metrics.measure(20),
    height: Metrics.measure(20),
  },
  inputSearchStyle: {
    height: Metrics.measure(40),
    fontSize: Metrics.measure(16),
  },
});
