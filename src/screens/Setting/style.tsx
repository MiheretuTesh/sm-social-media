import {StyleSheet} from 'react-native';
import Metrics from '../../constants/Metrics';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Metrics.measure(10),
    paddingHorizontal: Metrics.measure(10),
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: Metrics.measure(12),
    padding: Metrics.measure(16),
    marginTop: Metrics.measure(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: Metrics.measure(60),
    height: Metrics.measure(60),
  },
  nameContainer: {
    marginLeft: Metrics.measure(16),
  },
  name: {
    fontSize: Metrics.measure(20),
    fontWeight: 'bold',
    color: 'black',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    marginRight: Metrics.measure(8),
  },
  statusText: {
    fontSize: Metrics.measure(14),
    color: 'green',
  },
  editProfileIcon: {
    position: 'absolute',
    top: 20, // Adjust the position from the top as needed
    right: 10, // Adjust the position from the right as needed
    //backgroundColor: 'blue', // Background color of the icon
    borderRadius: 30, // Adjust to make the icon a circle
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preferencesSection: {
    backgroundColor: 'white',
    borderRadius: Metrics.measure(12),
    padding: Metrics.measure(16),
    marginTop: Metrics.measure(16),
  },
  preferencesHeader: {
    fontSize: Metrics.measure(18),
    fontWeight: 'bold',
    marginBottom: Metrics.measure(12),
    color: 'black',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.measure(8),
    paddingVertical: Metrics.measure(4),
    borderTopWidth: Metrics.measure(1),
  },
  preferenceIcon: {
    marginRight: Metrics.measure(8),
    fontSize: Metrics.measure(24),
    color: 'gray',
  },
  preferenceText: {
    fontSize: Metrics.measure(16),
    color: 'black',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  cancelButton: {
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  deleteButton: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
