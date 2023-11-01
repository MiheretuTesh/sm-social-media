import {StyleSheet} from 'react-native';
import Metrics from '../../../constants/Metrics';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.measure(6),
    gap: Metrics.measure(4),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.measure(8),
    gap: Metrics.measure(4),
    alignItems: 'center',
  },
  avatorContainer: {
    width: Metrics.measure(42),
    height: Metrics.measure(42),
    marginLeft: Metrics.measure(6),
    backgroundColor: '#a3a3a3',
    borderRadius: Metrics.measure(50),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: Metrics.measure(50),
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.measure(4),
  },
  nameText: {
    color: 'black',
    fontSize: Metrics.measure(15),
    fontWeight: 'bold',
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    gap: Metrics.measure(15),
    marginHorizontal: Metrics.measure(6),
    alignItems: 'center',
    alignSelf: 'center',
  },

  statusOnline: {
    color: '#2F9AFF',
  },
  statusOffline: {color: 'black'},
});
