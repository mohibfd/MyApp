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
  inputContainer: {
    padding: EStyleSheet.value('5rem'),
  },
  inputStyle: {
    borderColor: 'black',
    borderWidth: EStyleSheet.value('1rem'),
    padding: EStyleSheet.value('10rem'),
    borderRadius: EStyleSheet.value('2rem'),
  },
  plusButton: {
    fontSize: EStyleSheet.value('28rem'),
    fontWeight: '400',
  },
});

export default styles;
