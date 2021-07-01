import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({list, deleteItemFromStorage, navigation}) => {
  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <TouchableOpacity
      style={styles.ListItem}
      onPress={() => navigation.navigate('Online View')}>
      <View style={styles.ListItemView}>
        <Text style={styles.listItemText}>{list.name}</Text>
        <Icon
          name="remove"
          size={27}
          color="firebrick"
          onPress={() => deleteItemFromStorage(list.key)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ListItem: {
    padding: 15,
    paddingRight: 38,
    borderBottomWidth: 1,
  },
  ListItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 20,
  },
});

export default ListItem;
