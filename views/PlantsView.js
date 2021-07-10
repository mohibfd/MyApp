import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Button, FlatList, Alert} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';

import ListItem from '../components/ListItem';
import Header from '../components/Header';
import PlantItem from '../components/PlantItem';

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

  const [plants, setPlants] = useState([]);

  const createTask = newPlantName => {
    setPlants(prevItems => {
      return [{name: newPlantName, key: uuid.v4()}, ...prevItems];
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Plants" add={createTask} />

      {/* <PlantItem task={plants} /> */}
      {plants.map(task => (task ? <PlantItem task={task} /> : null))}
    </SafeAreaView>
  );
}
