import uuid from 'react-native-uuid';

const menuItems = [
  {name: 'plants', icon: 'leaf', color: 'green', key: uuid.v4()},
  {name: 'invest', icon: 'money', color: 'green', key: uuid.v4()},
];

global.globalMenuItems = menuItems;
