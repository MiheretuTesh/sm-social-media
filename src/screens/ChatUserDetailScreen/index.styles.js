import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  closeButtonText: {
    color: 'red',
  },
  profileSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionList: {
    marginTop: 2,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileDetailContainer: {
    flexDirection: 'row',
  },
  profileDetail: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  userStatus: {
    fontSize: 14,
    color: 'gray',
    marginTop: 0,
  },
  actionsSection: {
    marginBottom: 20,
  },
  actionButton: {
    fontSize: 17,
    color: 'black',
  },
  privacySection: {
    marginBottom: 20,
  },
  privacyButton: {
    fontSize: 17,
    color: 'red',
  },
  sharedMediaSection: {},
  sharedMediaHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mediaTabs: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    margin: 5,
    paddingVertical: 4,
    borderRadius: 5,
    backgroundColor: '#E1E1E1',
  },
  mediaTab: {
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
  activeTab: {
    // paddingHorizontal: 5,
    borderRadius: 5,
    fontSize: 16,
    //backgroundColor: '#B8B8B8',
  },
});
