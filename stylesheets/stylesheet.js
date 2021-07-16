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
  //HEADER
  header: {
    height: '7%',
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: EStyleSheet.value('25rem'),
  },
  plusButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  plusButton: {
    alignSelf: 'flex-end',
    fontSize: EStyleSheet.value('40rem'),
    marginRight: EStyleSheet.value('7rem'),
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
    fontSize: EStyleSheet.value('33rem'),
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
  threeFlatList: {
    padding: EStyleSheet.value('20rem'),
  },
  //MODAL

  //PLANT VIEW
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: EStyleSheet.value('5rem'),
  },
  overlay: {
    width: '90%',
    height: '35%',
    justifyContent: 'space-between',
  },
  deleteOverlayText: {
    fontSize: EStyleSheet.value('25rem'),
  },
  deleteOverlay: {
    width: '90%',
    height: '25%',
    justifyContent: 'space-between',
  },
  //PLANT VIEW
});

export default styles;
