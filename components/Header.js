import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import AddItemHeader from './AddItemHeader';

//simple function that styles headers
const Header = ({title, add, developerAdd, instantAdd}) => {
  return (
    <View style={styles.header}>
      <View style={styles.developerPlusButtonContainer}>
        {developerAdd ? <AddItemHeader createItem={developerAdd} /> : null}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.plusButtonContainer}>
        {(add || instantAdd) && (
          <AddItemHeader createItem={add} instantAdd={instantAdd} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '7%',
    backgroundColor: myPurple,
    justifyContent: 'center',
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  text: {
    textAlign: 'left',
    color: '#FAEEFF',
    fontSize: EStyleSheet.value('25rem'),
  },
  developerPlusButtonContainer: {
    position: 'absolute',
  },
  plusButtonContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});

Header.defaultProps = {
  title: '',
  add: null,
  developerAdd: null,
  instantAdd: null,
};

Header.propTypes = {
  title: PropTypes.string,
  add: PropTypes.func,
  developerAdd: PropTypes.func,
  instantAdd: PropTypes.func,
};

export default Header;
