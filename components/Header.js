import React from 'react';
import {View, Text} from 'react-native';

import {AddPlant} from './AddPlant';
import styles from '../stylesheets/stylesheet';

//simple function that styles headers
const Header = ({title, add}) => {
  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.plusButtonContainer}>
        {add && <AddPlant createTask={add} />}
      </View>
    </View>
  );
};

Header.defaultProps = {
  title: 'You forgot to add header',
};

export default Header;
