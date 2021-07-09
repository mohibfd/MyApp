import {StyleSheet, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
const rem =
  entireScreenWidth > entireScreenHeight
    ? entireScreenHeight / 380
    : entireScreenWidth / 380;
EStyleSheet.build({$rem: rem});

const styles = StyleSheet.create({
  //ONLINE
  inputContainer: {
    padding: EStyleSheet.value('5rem'),
  },
  inputStyle: {
    borderColor: 'black',
    borderWidth: EStyleSheet.value('1rem'),
    padding: EStyleSheet.value('10rem'),
    borderRadius: EStyleSheet.value('2rem'),
  },
  manageTeamWrapper: {
    width: EStyleSheet.value('350rem'),
  },
  manageTeamTitle: {
    marginBottom: EStyleSheet.value('10rem'),
  },
  addTeamMemberInput: {
    borderBottomColor: 'black',
    borderBottomWidth: EStyleSheet.value('1rem'),
    marginTop: EStyleSheet.value('5rem'),
    fontSize: EStyleSheet.value('18rem'),
  },
  manageTeamButtonContainer: {
    paddingTop: EStyleSheet.value('50rem'),
    alignSelf: 'center',
    width: '50%',
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderBottomWidth: EStyleSheet.value('1rem'),
  },
  plusButton: {
    fontSize: EStyleSheet.value('28rem'),
    fontWeight: '400',
  },
  //ONLINE

  //HEADER
  header: {
    height: EStyleSheet.value('60rem'),
    padding: EStyleSheet.value('15rem'),
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
  //HEADER

  //MAIN HOME PAGE
  welcome: {
    flex: 1,
  },
  ListItem: {
    flex: 1,
    width: '50%',
    backgroundColor: '#e6ffff',
    paddingVertical: EStyleSheet.value('30rem'),
    borderWidth: EStyleSheet.value('2rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    flex: 4,
    fontSize: EStyleSheet.value('35rem'),
    marginLeft: EStyleSheet.value('10rem'),
  },
  redCross: {
    flex: 1,
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
  modalToggle: {
    borderColor: '#f2f2f2',
    padding: EStyleSheet.value('20rem'),
    paddingRight: EStyleSheet.value('25rem'),
    alignSelf: 'flex-end',
  },

  goOnlineButton: {
    paddingBottom: EStyleSheet.value('40rem'),
    alignSelf: 'center',
    width: '75%',
  },
  //MAIN HOME PAGE

  //MODAL
  modalClose: {
    paddingTop: EStyleSheet.value('10rem'),
    alignSelf: 'center',
  },
  // input: {
  //   height: EStyleSheet.value('60rem'),
  //   padding: EStyleSheet.value('8rem'),
  //   fontSize: EStyleSheet.value('16rem'),
  //   marginBottom: EStyleSheet.value('10rem'),
  // },
  threeFlatList: {
    padding: EStyleSheet.value('20rem'),
  },

  //MODAL
});

export default styles;
