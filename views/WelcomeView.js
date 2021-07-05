import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Button, FlatList} from 'react-native';
import styles from '../stylesheet';
import uuid from 'react-native-uuid';
import ListItem from '../components/ListItem';
import Header from '../components/Header';
import AddModal from '../components/addItemModal';

const MMKV = new MMKVStorage.Loader().initialize();

export const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

export function WelcomeView({navigation}) {
  let USER_2 = {
    name: 'I LIKE YOU',
    key: uuid.v4(),
    age: 22,
    traits: {
      hair: 'black',
      eyes: 'blue',
    },
  };

  const [item, setItem] = useStorage('TOMATO');

  const [value, setValue] = useState([]);

  const readItemFromStorage = async () => {
    setValue(item != null ? JSON.parse(item) : []);
  };

  const writeItemToStorage = async newValue => {
    value.push(newValue);
    setItem(JSON.stringify(value));
    setValue(value);
  };
  const addList = name => {
    let newId = uuid.v4();

    //adding new list to realm
    // realm.create('todoList', { id: newId, name: text, children: []});

    //returning the new list with all the previous ones to show on our app
    setValue(prevItems => {
      return [{id: newId, name, children: []}, ...prevItems];
    });
  };

  const deleteItemFromStorage = key => {
    setValue(prevItems => {
      return prevItems.filter(item => item.key != key);
    });
    // The below code displays the alert dialog after two seconds.

    console.log(value);
    setTimeout(() => {
      console.log(value);
    }, 2000);

    setItem(JSON.stringify(value));
  };

  const deleteListFromStorage = async () => {
    MMKV.removeItem('TOMATO');

    setValue([]);
  };

  useEffect(() => {
    readItemFromStorage();
    // return () => {
    //   console.log(value);
    //   setItem(JSON.stringify(value));
    // };
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
      <AddModal addList={addList} />

      <View style={styles.goOnlineButton}>
        <Button
          onPress={() => deleteListFromStorage()}
          title="Delete List"
          color="#841584"
        />
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
