import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {
  TouchableHighlight,
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyInput from 'react-native-currency-input';

import generalStyles from '../stylesheets/generalStylesheet';
import {Input} from 'react-native-elements';

const defaultSize = EStyleSheet.value('80rem');

const imageSize = Dimensions.get('window').width * 0.28;

const RenderIcons = ({item, toggleMainModal, addMainItem}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [numberInput, setNumberInput] = useState(0);

  const createMainItem = () => {
    if (item.icon) {
      addMainItem(item);
    } else {
      addMainItem(item.price, numberInput);
    }
    toggleMainModal();
  };

  return (
    <View style={styles.container}>
      {item.icon ? (
        <Icon
          name={item.icon}
          size={defaultSize}
          color={item.color}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      ) : (
        <View style={styles.smallImage}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={item.imageSource}
            />
          </Pressable>
        </View>
      )}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}>
          <View style={generalStyles.centeredView}>
            {item.imageSource && (
              <View
                style={{
                  width: '100%',
                  height: EStyleSheet.value('60rem'),
                  // height: '12%',
                  // marginBottom: EStyleSheet.value('30rem'),
                }}>
                <Text
                  style={{
                    color: myWhite,
                    textAlign: 'center',
                    fontSize: EStyleSheet.value('14rem'),
                  }}>
                  How much of {item.name} do you hold
                </Text>
                <CurrencyInput
                  style={styles.currencyInputContainer}
                  value={numberInput}
                  onChangeValue={setNumberInput}
                  maxLength={10}
                />
              </View>
            )}
            <View style={styles.buttonsContainer}>
              <TouchableHighlight
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, styles.buttonOpen]}
                onPress={() => createMainItem()}>
                <Text style={styles.textStyle}>
                  {item.icon ? 'Create' : 'Add'} {item.name}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: EStyleSheet.value('10rem'),
    width: '33%',
  },
  button: {
    marginHorizontal: '2%',
    borderRadius: EStyleSheet.value('20rem'),
    paddingHorizontal: EStyleSheet.value('5rem'),
    paddingVertical: EStyleSheet.value('10rem'),
  },
  buttonsContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: myWhite,
    borderRadius: 10,
    paddingVertical: EStyleSheet.value('10rem'),
    backgroundColor: myBlack + 'BF',
  },
  buttonOpen: {
    backgroundColor: myPurple,
    width: '55%',
  },
  buttonClose: {
    backgroundColor: myBlue,
    width: '35%',
  },
  textStyle: {
    fontSize: EStyleSheet.value('18rem'),
    color: myWhite,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallImage: {
    width: imageSize,
    height: imageSize,
  },
  currencyInputContainer: {
    color: myWhite,
    flex: 1,
    width: '50%',
    fontSize: EStyleSheet.value('18rem'),
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: myBlack,
    borderWidth: EStyleSheet.value('2rem'),
    borderColor: myWhite,
  },
});

RenderIcons.propTypes = {
  item: PropTypes.object.isRequired,
  toggleMainModal: PropTypes.func.isRequired,
  addMainItem: PropTypes.func.isRequired,
};

export default RenderIcons;
