import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  TouchableHighlight,
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import CurrencyInput from 'react-native-currency-input';
import DropDownPicker from 'react-native-dropdown-picker';
import PushNotification from 'react-native-push-notification';

import generalStyles from '../../stylesheets/generalStylesheet';

const defaultSize = EStyleSheet.value('80rem');

const imageSize = Dimensions.get('window').width * 0.28;

const RenderIcons = ({item, toggleMainModal, addMainItem}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [numberInput, setNumberInput] = useState(0);

  const [interestInput, setInterestInput] = useState(0);

  const [showDropDownPicker, setShowDropDownPicker] = useState(false);
  const [dropDownPickerValue, setDropDownPickerValue] = useState(null);

  const [interestInterval, setInterestInterval] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
    {label: 'Yearly', value: 'yearly'},
  ]);

  const [showDropDownPickerTwo, setShowDropDownPickerTwo] = useState(false);
  const [dropDownPickerValueTwo, setDropDownPickerValueTwo] = useState(null);

  const [interestIntervalTwo, setInterestIntervalTwo] = useState([
    {label: '15 days', value: 15},
    {label: '30 days', value: 30},
    {label: '60 days', value: 60},
    {label: '90 days', value: 90},
  ]);

  const [showSplashText, setShowSplashText] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
  const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

  const createMainItem = () => {
    if (item.icon) {
      addMainItem(item);
      toggleMainModal();
    } else {
      if (numberInput === 0) {
        Alert.alert('You entered 0', 'Please enter a number', [{text: 'OK'}]);
      } else {
        if (!dropDownPickerValue && interestInput !== 0) {
          setShowSplashText(true);

          setTimeout(() => {
            setShowSplashText(false);
          }, 2000);

          return;
        }

        item.quantity = numberInput;
        if (interestInput) {
          item.interest = {
            earnedInterest: 0,
            percentage: interestInput,
            interval: dropDownPickerValue,
            until: dropDownPickerValueTwo,
            startDate: Date.now(),
          };

          if (dropDownPickerValueTwo) {
            let period;
            switch (dropDownPickerValueTwo) {
              case 15:
                period = '15 days';
                break;
              case 30:
                period = '30 days';
                break;
              case 60:
                period = '60 days';
                break;
              case 90:
                period = '90 days';
                break;
            }

            //we add 2 more days delay because of binance's staking delay
            const notifDate = new Date(
              Date.now() +
                globalOneDayInMilliSeconds * dropDownPickerValueTwo +
                globalOneDayInMilliSeconds * 2,
            );

            PushNotification.localNotificationSchedule({
              channelId: 'test-channel1',
              date: notifDate,
              title: 'Interest ended',
              message: `your ${item.name} has finished its ${period} staking period`,
              allowWhileIdle: true,
              actions: ['Take me there'],
            });
          }
        }

        addMainItem(item);
        toggleMainModal();
      }
    }
  };

  const setInterestInputFunc = value => {
    if (value) {
      setInterestInput(value);
    } else {
      setInterestInput(0);
    }
  };

  const bottomSize = () => {
    if (keyboardStatus === 'Keyboard Shown') {
      if (interestInput) {
        return '0%';
      } else {
        return '10%';
      }
    } else {
      if (interestInput) {
        return '0%';
      } else {
        return '40%';
      }
    }
  };

  const position = interestInput ? 'relative' : 'absolute';

  let inputRef;

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
            <Image style={styles.image} source={item.imageSource} />
          </Pressable>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        overFlow={'visible'}
        onRequestClose={() => {
          setModalVisible(false);
        }}
        onModalShow={() => {
          inputRef.blur();
          inputRef.focus();
        }}>
        <View
          style={[
            generalStyles.centeredView,
            {
              position,
              bottom: bottomSize(),
            },
          ]}>
          {item.imageSource && (
            <View>
              <View style={styles.currencyInputOutsideContainer}>
                <Text style={styles.textContainer}>{item.name} amount: </Text>
                <CurrencyInput
                  ref={ref => (inputRef = ref)}
                  style={styles.currencyInputContainer}
                  value={numberInput}
                  onChangeValue={setNumberInput}
                  delimiter=","
                  separator="."
                  maxLength={15}
                  precision={8}
                  autoFocus={true}
                />
              </View>
              <View style={styles.currencyInputOutsideContainer}>
                <Text style={styles.textContainer}>
                  Interest Percentage (APY):{' '}
                </Text>
                <CurrencyInput
                  style={styles.currencyInputContainer}
                  value={interestInput}
                  onChangeValue={setInterestInputFunc}
                  suffix="%"
                  delimiter=","
                  separator="."
                  maxLength={10}
                  precision={2}
                />
              </View>
              {interestInput !== undefined && interestInput !== 0 && (
                <View
                  style={[
                    styles.currencyInputOutsideContainer,
                    styles.dropDownOutsideContainer,
                  ]}>
                  <View style={styles.interestInterval}>
                    <Text style={styles.textContainer}>
                      How often does your interest occur:
                    </Text>
                    <DropDownPicker
                      open={showDropDownPicker}
                      value={dropDownPickerValue}
                      setOpen={setShowDropDownPicker}
                      setValue={setDropDownPickerValue}
                      items={interestInterval}
                      setItems={setInterestInterval}
                      arrowIconStyle={{tintColor: myWhite}}
                      tickIconStyle={{tintColor: myWhite}}
                      style={styles.dropDownStyle}
                      textStyle={{color: myWhite}}
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                    />
                    <Text style={generalStyles.splashText}>
                      {showSplashText
                        ? 'please select one of the available options'
                        : null}
                    </Text>
                  </View>

                  <Text style={styles.textContainer}>
                    How long will it remain:
                  </Text>

                  <DropDownPicker
                    open={showDropDownPickerTwo}
                    value={dropDownPickerValueTwo}
                    setOpen={setShowDropDownPickerTwo}
                    setValue={setDropDownPickerValueTwo}
                    items={interestIntervalTwo}
                    setItems={setInterestIntervalTwo}
                    arrowIconStyle={{tintColor: myWhite}}
                    tickIconStyle={{tintColor: myWhite}}
                    style={styles.dropDownStyle}
                    textStyle={{color: myWhite}}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    dropDownDirection="TOP"
                    placeholder="No specific time"
                  />
                </View>
              )}
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
  image: {
    width: '100%',
    height: '100%',
  },
  currencyInputOutsideContainer: {
    width: '100%',
    height: EStyleSheet.value('60rem'),
    flexDirection: 'row',
    backgroundColor: myBlack,
    borderWidth: EStyleSheet.value('2rem'),
    borderColor: myWhite,
    alignItems: 'center',
  },
  interestInterval: {flex: 1, alignItems: 'center'},
  textContainer: {
    color: myWhite,
    fontSize: EStyleSheet.value('16rem'),
    marginLeft: EStyleSheet.value('10rem'),
    padding: '2%',
  },
  currencyInputContainer: {
    color: myWhite,
    flex: 1,
    fontSize: EStyleSheet.value('17rem'),
    textAlign: 'right',
    marginRight: '5%',
  },
  dropDownOutsideContainer: {
    flexDirection: 'column',
    height: EStyleSheet.value('230rem'),
  },
  dropDownContainerStyle: {
    backgroundColor: myBlack,
    borderColor: 'gold',
  },
  dropDownStyle: {
    backgroundColor: myBlack,
    borderColor: 'gold',
    zIndex: 1,
    marginBottom: '1%',
  },
});

RenderIcons.propTypes = {
  item: PropTypes.object.isRequired,
  toggleMainModal: PropTypes.func.isRequired,
  addMainItem: PropTypes.func.isRequired,
};

export default RenderIcons;
