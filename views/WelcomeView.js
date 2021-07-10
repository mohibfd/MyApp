import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Button, FlatList, Alert} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';

import ListItem from '../components/ListItem';
import Header from '../components/Header';
import AddItemModal from '../components/modals/addItemModal';
import CreateOrCancel from '../components/CreateOrCancel.js';

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

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

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
      return [{name: mainItem.name, id: uuid.v4()}, ...prevItems];
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

  //deleting item from storage pop up
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteItem(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    MMKV.removeItem(deleteItem.name + 'Id');

    setItems(prevItems => {
      return prevItems.filter(item => item != deleteItem);
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
            deleteItemFromStorage={openDeleteOrCancel}
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
      {isDeleteOrCancel && (
        <CreateOrCancel
          name={deleteItem.name}
          action={completeDeletion}
          action2={toggleDeleteOrCancel}
          deletion
        />
      )}
    </SafeAreaView>
  );
}
