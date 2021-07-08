import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Button, FlatList, Alert} from 'react-native';
import styles from '../stylesheet';
import uuid from 'react-native-uuid';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import AddItemModal from '../components/modals/addItemModal';
import '../components/global.js';

const MMKV = new MMKVStorage.Loader().initialize();

export const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

export function WelcomeView({navigation}) {
  const [item, setItem] = useStorage('idOne');
  const [item1, setItem1] = useStorage('plantsId');
  const [item2, setItem2] = useStorage('investmentId');

  const [value, setValue] = useState();

  // console.log(menuItems);

  const readItemFromStorage = async () => {
    newList = [];
    if (item1) {
      newList.push(JSON.parse(item1));
    }
    if (item2) {
      newList.push(JSON.parse(item2));
    }

    setValue(newList);
  };

  const addMainItem = mainItem => {
    switch (mainItem.name) {
      case 'plants':
        setItem1(JSON.stringify(mainItem));
        break;

      case 'investment':
        setItem2(JSON.stringify(mainItem));
        break;
      default:
        Alert.alert('NOT FOUND');
    }

    //returning the new list with all the previous ones to show on our app
    setValue(prevItems => {
      return [{id: uuid.v4(), name: mainItem.name, children: []}, ...prevItems];
    });
  };

  const deleteItemFromStorage = mainItem => {
    MMKV.removeItem(mainItem.name + 'Id');
    setValue(prevItems => {
      return prevItems.filter(item => item.key != mainItem.key);
    });
    // The below code displays the alert dialog after two seconds.

    setItem(JSON.stringify(value));
  };

  const deleteListFromStorage = async () => {
    MMKV.removeItem('idOne');

    setValue([]);
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <SafeAreaView style={styles.offlineStyle}>
      <Header title="My Items" />

      <View style={styles.offlineStyle}>
        {/* <Button onPress={() => writeItemToStorage(USER_2)} title="Add bob" /> */}
        <FlatList
          data={value}
          renderItem={({item}) => (
            <ListItem
              list={item}
              deleteItemFromStorage={deleteItemFromStorage}
              navigation={navigation}
            />
          )}
        />
      </View>

      <AddItemModal addMainItem={addMainItem} />

      <View style={styles.goOnlineButton}>
        {/* <Button
          onPress={() => deleteListFromStorage()}
          title="Delete List"
          color="#841584"
        /> */}
        <Button
          onPress={() => navigation.navigate('Online View')}
          title="Go Online"
          color="#841584"
        />
      </View>
    </SafeAreaView>
  );
}

// export default Welcome View;
