import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import CurrencyInput from 'react-native-currency-input';
import PushNotification from 'react-native-push-notification';

const AddIconModal = ({setModalVisible, asset, refresh}) => {
  const [interestInput, setInterestInput] = useState(0);

  const [interestLength, setInterestLength] = useState('0');

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

  const topSize = () => {
    if (keyboardStatus === 'Keyboard Shown') {
      return '20%';
    }
  };

  const setInterestInputFunc = value => {
    if (value) {
      setInterestInput(value);
    } else {
      setInterestInput(0);
    }
  };

  const setInterestLengthFunc = value => {
    if (value) {
      setInterestLength(value);
    } else {
      setInterestLength('0');
    }
  };

  const addInterest = () => {
    const length = parseInt(interestLength, 10);
    asset.interest = {
      earnedInterest: 0,
      percentage: interestInput,
      interval: 'daily',
      until: length,
      startDate: Date.now(),
    };

    //we add 2 more days delay because of binance's staking delay
    const notifDate = new Date(
      Date.now() +
        globalOneDayInMilliSeconds * length +
        globalOneDayInMilliSeconds * 2,
    );

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel1',
      date: notifDate,
      title: 'Interest ended',
      message: `your ${asset.name} has finished its staking period`,
      allowWhileIdle: true,
    });

    refresh();
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      overFlow={'visible'}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={[styles.container, {top: topSize()}]}>
        <Icon
          name="remove"
          size={EStyleSheet.value(50)}
          color="red"
          onPress={() => setModalVisible()}
        />
        <View style={styles.buttonsContainer}>
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
          <View style={styles.currencyInputOutsideContainer}>
            <Text style={styles.textContainer}> Interest Length</Text>
            <TextInput
              style={styles.currencyInputContainer}
              value={interestLength}
              onChangeText={setInterestLengthFunc}
              maxLength={2}
              placeholder="0"
              keyboardType="numeric"
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => addInterest()}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    alignItems: 'center',
    padding: EStyleSheet.value('10rem'),
    justifyContent: 'center',
  },
  button: {
    borderRadius: EStyleSheet.value('20rem'),
    paddingHorizontal: EStyleSheet.value('20rem'),
    paddingVertical: EStyleSheet.value('10rem'),
  },
  buttonsContainer: {
    borderWidth: 2,
    borderColor: myWhite,
    borderRadius: 10,
    paddingVertical: EStyleSheet.value('10rem'),
    backgroundColor: myBlack + 'BF',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: myPurple,
    width: '100%',
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
  currencyInputOutsideContainer: {
    width: '100%',
    height: EStyleSheet.value('60rem'),
    flexDirection: 'row',
    backgroundColor: myBlack,
    borderBottomWidth: EStyleSheet.value('2rem'),
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
});

AddIconModal.propTypes = {
  asset: PropTypes.object.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default AddIconModal;
