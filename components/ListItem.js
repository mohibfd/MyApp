import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesheets/stylesheet';

import PushNotification from 'react-native-push-notification';

const ListItem = ({item, deleteItemFromStorage, navigation}) => {
  //tells you which page to go to
  const navigateTo = () => {
    switch (item.name) {
      case 'Plants':
        navigation.navigate('Plants View');
        break;
      case 'Invest':
        handleNotification(item.name);
        break;
      case 'Workout':
        // navigation.navigate('Online View');
        break;
      default:
        Alert.alert('NOT FOUND');
    }
  };

  const handleNotification = name => {
    // PushNotification.localNotification({
    //   channelId: 'test-channel',
    //   // title: 'You clicked on' + name,
    //   title: 'babyyyyy',
    //   message: 'I really like you and miss you :)',
    // });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Annika',
      message: 'my cute cute cute cute cute baby',
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true,
    });
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
