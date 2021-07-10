import React, {useEffect} from 'react';
import {View, Text, Overlay, overlayVisible, Input, Button} from 'react-native';

import {AddPlant} from './AddPlant';
import styles from '../stylesheets/stylesheet';

//simple function that styles headers
const Header = ({title, add}) => {
  const addFunc = () => {
    return <AddPlant createTask={add} />;
  };

  return (
    <View style={styles.header}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.plusButtonContainer}>{add && addFunc()}</View>
    </View>
  );
};

Header.defaultProps = {
  title: 'You forgot to add header',
};

export default Header;
