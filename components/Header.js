import PropTypes from 'prop-types';
import React from 'react';
import {View, Text} from 'react-native';

import AddItemHeader from './AddItemHeader';
import styles from '../stylesheets/stylesheet';

//simple function that styles headers
const Header = ({title, add, developerAdd}) => {
  return (
    <View style={styles.header}>
      <View style={styles.developerPlusButtonContainer}>
        {developerAdd && <AddItemHeader createItem={developerAdd} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.plusButtonContainer}>
        {add && <AddItemHeader createItem={add} />}
      </View>
    </View>
  );
};

Header.defaultProps = {
  add: null,
  developerAdd: null,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  add: PropTypes.func,
  developerAdd: PropTypes.func,
};

export default Header;
