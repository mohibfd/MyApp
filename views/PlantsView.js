import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import PlantItem from '../components/PlantItem';
import DeleteOrCancel from '../components/CreateOrCancel.js';

const MMKV = new MMKVStorage.Loader().initialize();

export const useStorage = key => {
  const [value, setValue] = useMMKVStorage(key, MMKV);
  return [value, setValue];
};

export function PlantsView() {
  const [plantsStorage, setPlantsStorage] = useStorage('plantss');

  const [plants, setPlants] = useState(plantsStorage ? plantsStorage : []);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deletePlant, setDeletePlant] = useState(null);

  useEffect(() => {
    setPlantsStorage(plants);
  });

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createPlant = newPlantName => {
    console.log('here');

    setPlants(prevItems => {
      return [{name: newPlantName, key: uuid.v4()}, ...prevItems];
    });
    console.log('here3');
  };

  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeletePlant(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    setPlants(prevItems => {
      return prevItems.filter(item => item != deletePlant);
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Plants" add={createPlant} />

      {plants &&
        plants.map(plant =>
          plant ? (
            <PlantItem plant={plant} deletion={openDeleteOrCancel} />
          ) : null,
        )}
      {isDeleteOrCancel && (
        <DeleteOrCancel
          name={deletePlant.name}
          action={completeDeletion}
          action2={toggleDeleteOrCancel}
          deletion
        />
      )}
    </SafeAreaView>
  );
}
