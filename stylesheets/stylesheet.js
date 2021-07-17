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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: 'row',
  },
  button: {
    width: '40%',
    marginHorizontal: '2%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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

  deleteOverlay: {
    flex: 0.17,
    width: '90%',
    // height: '20%',
    justifyContent: 'space-between',
  },
  deleteOverlayText: {
    flex: 1,
    paddingLeft: '5%',
    fontSize: EStyleSheet.value('25rem'),
  },
  //PLANT VIEW

  //DELETEORCANCEL
  container: {
    flexDirection: 'row',
    //height: 40,
    height: 50,
    paddingVertical: 5,
    //width: "100%"
  },
  textStyles: {
    textAlign: 'center',
    //flex: 1,
    color: 'white',
    //height: "100%",

    //width: "100%",
    //paddingVertical: 12,
    //borderWidth: 2,
    textAlignVertical: 'center',
  },
  textStylesDark: {
    fontSize: EStyleSheet.value('20rem'),
    textAlign: 'center',
    //flex: 1,
    color: 'white',
    //height: "100%",

    //width: "100%",
    //paddingVertical: 12,
    //borderWidth: 2,
  },
  darkButtonContainer: {
    width: '45%',
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'black',
  },
  //DELETEORCANCEL
});

export default styles;
