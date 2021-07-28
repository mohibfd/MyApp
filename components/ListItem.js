import PropTypes from 'prop-types';
import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import generalStyles from '../stylesheets/generalStylesheet';

const ListItem = ({item, deleteItemFromStorage, navigation}) => {
  //tells you which page to go to
  const navigateTo = () => {
    if (navigation) {
      switch (item.name) {
        case 'Plants':
          navigation.navigate('Plants View');
          break;
        case 'Invest':
          navigation.navigate('Invest View');
          break;
        case 'Workout':
          navigation.navigate('Workout View');
          break;
        default:
          Alert.alert('NOT FOUND');
      }
    }
  };

  //return our items alongside a delete icon that calls on deleteList function taking the element's id
  return (
    <Pressable style={styles.ListItem} onPress={() => navigateTo()}>
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

const styles = StyleSheet.create({
  ListItem: {
    flex: 1,
    width: '50%',
    backgroundColor: '#e6ffff',
    paddingVertical: EStyleSheet.value('30rem'),
    borderWidth: EStyleSheet.value('2rem'),
  },
  ListItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    flex: 4,
    fontSize: EStyleSheet.value('32rem'),
    marginLeft: EStyleSheet.value('10rem'),
  },
  redCross: {
    flex: 1,
    paddingHorizontal: EStyleSheet.value('5rem'),
  },
});

ListItem.defaultProps = {
  navigation: null,
};

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  deleteItemFromStorage: PropTypes.func.isRequired,
  navigation: PropTypes.object,
};

export default ListItem;
