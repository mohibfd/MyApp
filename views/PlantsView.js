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

export function PlantsView({navigation}) {
  // const [item, setItem] = useStorage('idOne');
  const [item1, setItem1] = useStorage('PlantsId');
  const [item2, setItem2] = useStorage('InvestId');
  const [item3, setItem3] = useStorage('WorkoutId');

  const [items, setItems] = useState();

  const createTask = newTaskName => {
    console.log('?');
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        'Task',
        new Task({
          name: newTaskName || 'New Task',
          partition: projectPartition,
        }),
      );
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Plants" add={createTask} />
    </SafeAreaView>
  );
}
