import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, Button, FlatList, Alert} from 'react-native';
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

  return (
    <SafeAreaView style={styles.welcome}>
      <Text>heys</Text>
    </SafeAreaView>
  );
}
