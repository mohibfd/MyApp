import {useState, useEffect, useRef, useCallback} from 'react';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

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

const useStateWithPromise = initialState => {
  const [state, setState] = useState(initialState);
  const resolverRef = useRef(null);

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(state);
      resolverRef.current = null;
    }
    /**
     * Since a state update could be triggered with the exact same state again,
     * it's not enough to specify state as the only dependency of this useEffect.
     * That's why resolverRef.current is also a dependency, because it will guarantee,
     * that handleSetState was called in previous render
     */
  }, [resolverRef.current, state]);

  const handleSetState = useCallback(
    stateAction => {
      setState(stateAction);
      return new Promise(resolve => {
        resolverRef.current = resolve;
      });
    },
    [setState],
  );

  return [state, handleSetState];
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

global.useStateWithPromise = useStateWithPromise;

global.globalRepeatNotifications = repeatNotifications;

global.EStyleSheet = EStyleSheet;
