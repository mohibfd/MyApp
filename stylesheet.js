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
  offlineStyle: {
    flex: 1,
  },
  goOnlineButton: {
    paddingBottom: EStyleSheet.value('50rem'),
    alignSelf: 'center',
    width: '50%',
  },
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

  //HEADER
  header: {
    height: 60,
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
  //HEADER

  //MODAL
  modalToggle: {
    borderColor: '#f2f2f2',
    paddingTop: EStyleSheet.value('10rem'),
    paddingRight: EStyleSheet.value('10rem'),
    alignSelf: 'flex-end',
  },
  modalClose: {
    alignSelf: 'center',
  },
  input: {
    height: EStyleSheet.value('60rem'),
    padding: EStyleSheet.value('8rem'),
    fontSize: EStyleSheet.value('16rem'),
    marginBottom: EStyleSheet.value('10rem'),
  },
  //MODAL
});

export default styles;
