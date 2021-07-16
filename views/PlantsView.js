import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import uuid from 'react-native-uuid';

import styles from '../stylesheets/stylesheet.js';
import Header from '../components/Header';
import PlantItem from '../components/PlantItem';
import DeleteOrCancel from '../components/CreateOrCancel.js';

export function PlantsView() {
  const [plantsStorage, setPlantsStorage] = useStorage('plantss');

  const [plants, setPlants] = useState(plantsStorage ? plantsStorage : []);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deletePlant, setDeletePlant] = useState(null);

  useEffect(() => {
    setPlantsStorage(plants);
    console.log(plants);
  }, [plants]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createPlant = newPlantName => {
    setPlants(prevItems => {
      return [
        {
          name: newPlantName,
          key: uuid.v4(),
          timeInterval: null,
          notificationId: null,
        },
        ...prevItems,
      ];
    });
  };

  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeletePlant(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    setPlants(prevItems => {
      return prevItems.filter(item => item.key != deletePlant.key);
    });
  };

  return (
    <SafeAreaView style={styles.welcome}>
      <Header title="My Plants" add={createPlant} />

      {plants &&
        plants.map(plant =>
          plant ? (
            <PlantItem
              key={plant.key}
              plant={plant}
              deletion={openDeleteOrCancel}
              setPlants={setPlants}
            />
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
