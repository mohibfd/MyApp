import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  plusButton: {
    alignSelf: 'flex-end',
    fontSize: EStyleSheet.value('40rem'),
    marginRight: EStyleSheet.value('7rem'),
  },
  modalClose: {
    paddingTop: EStyleSheet.value('10rem'),
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  splashText: {
    color: 'red',
    fontSize: EStyleSheet.value('25rem'),
    textAlign: 'center',
  },
  textStyles: {
    textAlign: 'center',
    color: 'white',
    textAlignVertical: 'center',
  },
  textStylesDark: {
    fontSize: EStyleSheet.value('20rem'),
    textAlign: 'center',
    color: 'white',
  },
  darkButtonContainer: {
    width: '45%',
    height: EStyleSheet.value('40rem'),
    justifyContent: 'center',
    borderRadius: EStyleSheet.value('5rem'),
    backgroundColor: 'black',
  },
});

export default styles;
