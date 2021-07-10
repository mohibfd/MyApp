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
  //LOGIN
  inputContainer: {
    padding: EStyleSheet.value('5rem'),
  },
  inputStyle: {
    borderColor: 'black',
    borderWidth: EStyleSheet.value('1rem'),
    padding: EStyleSheet.value('10rem'),
    borderRadius: EStyleSheet.value('2rem'),
  },
  //LOGIN

  //TASKS
  plusButton: {
    fontSize: EStyleSheet.value('28rem'),
    fontWeight: '400',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  //TASKS

  //MANAGE TEAM
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
  //MANAGE TEAM
});

export default styles;
