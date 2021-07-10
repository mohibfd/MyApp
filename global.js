import uuid from 'react-native-uuid';

const menuItems = [
  {name: 'Plants', icon: 'leaf', color: 'green', key: uuid.v4()},
  {name: 'Invest', icon: 'money', color: 'green', key: uuid.v4()},
  {name: 'Workout', icon: 'heartbeat', color: 'black', key: uuid.v4()},
];

global.globalMenuItems = menuItems;
