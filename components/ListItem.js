import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/stylesheet';

const ListItem = ({item, deleteItemFromStorage, navigation}) => {
  //tells you which page to go to
  const navigateTo = () => {
    switch (item.name) {
      case 'Plants':
        navigation.navigate('Plants View');
        break;
      case 'Invest':
        // navigation.navigate('Online View');
        break;
      case 'Workout':
        // navigation.navigate('Online View');
        break;
      default:
        Alert.alert('NOT FOUND');
    }
  };

  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <TouchableOpacity style={styles.ListItem} onPress={() => navigateTo()}>
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
    </TouchableOpacity>
  );
};

export default ListItem;
