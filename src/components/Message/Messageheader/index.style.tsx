import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 4,
    alignItems: 'center',
  },
  avatorContainer: {
    width: 42,
    height: 42,
    marginLeft: 6,
    backgroundColor: '#a3a3a3',
    borderRadius: 50,
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 4,
  },
  nameText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  actionButtonsWrapper: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
