// import {useState, useEffect, useRef, useCallback} from 'react';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import {Dimensions, Keyboard} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useState, useEffect} from 'react';

const myGreen = '#033E3E';
const myBlue = '#323766';
const myPurple = '#36013F';
const myRed = '#C32148';
const myWhite = '#FAEEFF';
const myBlack = '#121212';
const myBrown = '#964B00';
const myYellow = '#c1c71e';

global.myGreen = myGreen;
global.myBlue = myBlue;
global.myPurple = myPurple;
global.myRed = myRed;
global.myWhite = myWhite;
global.myBlack = myBlack;
global.myBrown = myBrown;
global.myYellow = myYellow;

const MMKV = new MMKVStorage.Loader().initialize();

const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

const repeatNotifications = 70;

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
const rem =
  entireScreenWidth > entireScreenHeight
    ? entireScreenHeight / 380
    : entireScreenWidth / 380;

EStyleSheet.build({$rem: rem});

global.MMKV = MMKV;

global.useStorage = useStorage;

global.globalRepeatNotifications = repeatNotifications;

global.EStyleSheet = EStyleSheet;

global.globalOneDayInMilliSeconds = 86400000;

const useKeyboardState = () => {
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus('Keyboard Shown');
  const _keyboardDidHide = () => setKeyboardStatus('Keyboard Hidden');

  return [keyboardStatus, setKeyboardStatus];
};

global.useKeyboardState = useKeyboardState;
