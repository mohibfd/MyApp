import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import styles from '../stylesheets/stylesheet';

//simple function that styles headers
const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  title: 'To-do list',
};

export default Header;
