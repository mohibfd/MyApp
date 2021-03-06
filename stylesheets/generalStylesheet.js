import {StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = StyleSheet.create({
  plusButton: {
    alignSelf: 'flex-end',
    marginHorizontal: EStyleSheet.value('7rem'),
  },
  modalClose: {
    paddingTop: EStyleSheet.value('10rem'),
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: EStyleSheet.value('22rem'),
  },
  splashText: {
    color: 'red',
    fontSize: EStyleSheet.value('15rem'),
    textAlign: 'center',
  },
  textStylesDark: {
    fontSize: EStyleSheet.value('20rem'),
    textAlign: 'center',
    color: myWhite,
  },
  darkButtonContainer: {
    width: '45%',
    height: EStyleSheet.value('40rem'),
    justifyContent: 'center',
    borderRadius: EStyleSheet.value('5rem'),
    backgroundColor: myBlue,
  },
  borderContainer: {
    width: '90%',
    backgroundColor: myBlack,
    borderWidth: EStyleSheet.value('2rem'),
    borderColor: myWhite,
    borderRadius: 5,
  },
});

export default styles;
