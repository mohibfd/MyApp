import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AddItemHeader from './AddItemHeader';
import generalStyles from '../stylesheets/generalStylesheet';

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

const styles = StyleSheet.create({
  header: {
    height: '7%',
    backgroundColor: 'darkslateblue',
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: EStyleSheet.value('25rem'),
  },
  developerPlusButtonContainer: {
    position: 'absolute',
    // alignSelf: 'flex-start',
  },
  plusButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});

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
