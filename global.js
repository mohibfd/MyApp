import uuid from 'react-native-uuid';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader().initialize();

const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

const menuItems = [
  {name: 'Plants', icon: 'leaf', color: 'green', key: uuid.v4()},
  {name: 'Invest', icon: 'money', color: 'green', key: uuid.v4()},
  {name: 'Workout', icon: 'heartbeat', color: 'black', key: uuid.v4()},
];

global.MMKV = MMKV;

global.useStorage = useStorage;

global.globalMenuItems = menuItems;
