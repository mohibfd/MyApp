import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheet';

const ListItem = ({list, deleteItemFromStorage, navigation}) => {
  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <TouchableOpacity
      style={styles.ListItem}
      onPress={() => navigation.navigate('Online View')}>
      <View style={styles.ListItemView}>
        <Text style={styles.listItemText}>{list.name}</Text>
        <Icon
          style={styles.test}
          name="remove"
          size={50}
          color="firebrick"
          onPress={() => deleteItemFromStorage(list)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
