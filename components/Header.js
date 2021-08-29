import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import AddItemHeader from './AddItemHeader';

//simple function that styles headers
const Header = ({
  title,
  add,
  developerAdd,
  instantAdd,
  cameraAdd,
  openNotifications,
}) => {
  const leftHeaderIcon = () => {
    if (developerAdd) {
      return <AddItemHeader createItem={developerAdd} />;
    } else if (cameraAdd) {
      return <AddItemHeader cameraAdd={true} instantAdd={cameraAdd} />;
    }
  };

  const rightHeaderIcon = () => {
    if (add || instantAdd) {
      return <AddItemHeader createItem={add} instantAdd={instantAdd} />;
    } else if (openNotifications) {
      return <AddItemHeader openNotifications={openNotifications} />;
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.developerPlusButtonContainer}>
        {leftHeaderIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={2} maxWidth={'60%'}>
          {title}
        </Text>
      </View>
      <View style={styles.plusButtonContainer}>{rightHeaderIcon()}</View>
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
    width: '70%',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
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
  cameraAdd: null,
  openNotifications: null,
};

Header.propTypes = {
  title: PropTypes.string,
  add: PropTypes.func,
  developerAdd: PropTypes.func,
  instantAdd: PropTypes.func,
  cameraAdd: PropTypes.func,
  openNotifications: PropTypes.func,
};

export default Header;
