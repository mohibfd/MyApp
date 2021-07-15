import {useState, useEffect, useRef, useCallback} from 'react';
import uuid from 'react-native-uuid';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

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

const menuItems = [
  {name: 'Plants', icon: 'leaf', color: 'green', key: uuid.v4()},
  {name: 'Invest', icon: 'money', color: 'green', key: uuid.v4()},
  {name: 'Workout', icon: 'heartbeat', color: 'black', key: uuid.v4()},
];

global.MMKV = MMKV;

global.useStorage = useStorage;

global.globalMenuItems = menuItems;

global.useStateWithPromise = useStateWithPromise;
