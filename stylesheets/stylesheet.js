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
    // flex: 1,
  },
  button: {
    width: '44%',
    // height: '10%',
    marginHorizontal: '2%',
    borderRadius: EStyleSheet.value('20rem'),
    paddingHorizontal: EStyleSheet.value('5rem'),
    paddingVertical: EStyleSheet.value('10rem'),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontSize: EStyleSheet.value('20rem'),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: EStyleSheet.value('15rem'),
    textAlign: 'center',
  },
  //MODAL

  //ITEM VIEW
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: EStyleSheet.value('15rem'),
  },

  //ITEM VIEW

  //PLANT VIEW
  plantText: {
    fontSize: EStyleSheet.value('40rem'),
  },
  overlay: {
    width: '90%',
    height: '40%',
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
  addButton: {
    width: '75%',
    alignSelf: 'center',
  },
  //PLANT VIEW

  //DELETEORCANCEL
  container: {
    flexDirection: 'row',
    height: EStyleSheet.value('50rem'),
    paddingVertical: EStyleSheet.value('5rem'),
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
    height: EStyleSheet.value('40rem'),
    justifyContent: 'center',
    borderRadius: EStyleSheet.value('5rem'),
    backgroundColor: 'black',
  },
  //DELETEORCANCEL

  //INVESTMENT VIEW
  investmentContainer: {
    height: EStyleSheet.value('80rem'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  investmentTitle: {
    // flex: 1,
    width: '30%',
    fontSize: EStyleSheet.value('30rem'),

    // marginLeft: EStyleSheet.value('10rem'),
  },
  textAndCurrencyContainer: {
    flex: 1,
    // flexDirection: 'column',
  },
  investmentTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  investmentText: {
    flex: 7,
    fontSize: EStyleSheet.value('16rem'),
    alignSelf: 'center',
    textAlign: 'right',
  },
  currencyInputContainer: {
    flex: 4,
    // fontSize: EStyleSheet.value('18rem'),
    textAlign: 'center',
  },
  //INVESTMENT VIEW
});

export default styles;
