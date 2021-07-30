import React, {useEffect, useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';

import generalStyles from '../stylesheets/generalStylesheet.js';
import Header from '../components/Header';
import PlantItem from '../components/PlantItem';
import DeleteOrCancel from '../components/DeleteOrCancel.js';

const PlantsView = () => {
  const [plantsStorage, setPlantsStorage] = useStorage('plantss');

  const [plants, setPlants] = useState(plantsStorage ? plantsStorage : []);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deletePlant, setDeletePlant] = useState(null);

  useEffect(() => {
    setPlantsStorage(plants);
  }, [plants]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createPlant = newPlantName => {
    if (plants.length == 7) {
      Alert.alert(
        'Too many plants',
        'Sorry you cannot have more than 7 plants at a time',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }

    setPlants(prevItems => {
      return [
        {
          name: newPlantName,
          key: uuid.v4(),
          notificationId: null,
        },
        ...prevItems,
      ];
    });
  };

  //also returns plant to be deleted
  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeletePlant(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    if (deletePlant.notificationId) {
      [...Array(globalRepeatNotifications)].map((e, i) => {
        const id = deletePlant.notificationId + i;
        PushNotification.cancelLocalNotifications({id});
      });
    }

    setPlants(prevItems => {
      return prevItems.filter(item => item.key != deletePlant.key);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
          deletion={completeDeletion}
          closeOverlay={toggleDeleteOrCancel}
        />
      )}
    </SafeAreaView>
  );
};

export default PlantsView;
