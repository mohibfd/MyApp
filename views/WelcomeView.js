import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Button, FlatList, Alert} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';

import ListItem from '../components/ListItem';
import Header from '../components/Header';
import AddItemModal from '../components/modals/addItemModal';

const MMKV = new MMKVStorage.Loader().initialize();

export const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

export function WelcomeView({navigation}) {
  // const [item, setItem] = useStorage('idOne');
  const [item1, setItem1] = useStorage('PlantsId');
  const [item2, setItem2] = useStorage('InvestId');
  const [item3, setItem3] = useStorage('WorkoutId');

  const [items, setItems] = useState();

  useEffect(() => {
    readItemFromStorage();
  }, []);

  const readItemFromStorage = async () => {
    newList = [];
    if (item1) {
      newList.push(item1);
    }
    if (item2) {
      newList.push(item2);
    }
    if (item3) {
      newList.push(item3);
    }
    setItems(newList);
  };

  //adding list to storage
  const addMainItem = mainItem => {
    if (isDuplicate(mainItem)) {
      return;
    }

    switch (mainItem.name) {
      case 'Plants':
        setItem1(mainItem);
        break;
      case 'Invest':
        setItem2(mainItem);
        break;
      case 'Workout':
        setItem3(mainItem);
        break;
      default:
        Alert.alert('NOT FOUND');
    }

    //returning the new list with all the previous ones to show on our app
    setItems(prevItems => {
      return [{id: uuid.v4(), name: mainItem.name, children: []}, ...prevItems];
    });
  };

  //checks if this item has been created already
  const isDuplicate = mainItem => {
    let breakFunction = false;
    items.map(item => {
      if (item.name == mainItem.name) {
        breakFunction = true;
      }
    });
    return breakFunction;
  };

  //deleting item from storage
  const deleteItemFromStorage = mainItem => {
    MMKV.removeItem(mainItem.name + 'Id');

    setItems(prevItems => {
      return prevItems.filter(item => item != mainItem);
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Items" />

      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem
            item={item}
            deleteItemFromStorage={deleteItemFromStorage}
            navigation={navigation}
          />
        )}
        numColumns={2}
      />

      <AddItemModal addMainItem={addMainItem} />

      <View style={styles.goOnlineButton}>
        <Button
          onPress={() => navigation.navigate('Online View')}
          title="Go Online"
          color="#841584"
        />
      </View>
    </SafeAreaView>
  );
}
