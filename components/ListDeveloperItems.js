import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/stylesheet';

const ListDeveloperItems = ({item, deleteItemFromStorage}) => {
  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <Pressable
      style={{
        // flex: 1,
        alignSelf: 'flex-end',
        // position: 'absolute',
        // left: 0,
        // marginTop: '13.1%',
        width: '100%',
        backgroundColor: '#e6ffff',
        // paddingVertical: 30,
        borderWidth: 2,
      }}
      onPress={() => navigateTo()}>
      <View style={styles.ListItemView}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Icon
          style={styles.redCross}
          name="remove"
          size={50}
          color="firebrick"
          onPress={() => deleteItemFromStorage(item)}
        />
      </View>
    </Pressable>
  );
};

ListDeveloperItems.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
};

export default ListDeveloperItems;
