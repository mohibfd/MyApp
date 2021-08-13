import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';

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
        ...prevItems,
        {
          name: newPlantName,
          key: uuid.v4(),
          notificationId: null,
        },
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../components/assets/Plants.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <Header title="My Plants" add={createPlant} />

        <Text style={styles.warning}>
          Each plant's notifications will trigger 70 times before stopping
        </Text>
        {plants &&
          plants.map(plant =>
            plant ? (
              <PlantItem
                key={plant.key}
                plant={plant}
                deletion={openDeleteOrCancel}
                setPlants={setPlants}
                plants={plants}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: myBlack},
  warning: {
    fontSize: EStyleSheet.value('12rem'),
    textAlign: 'center',
    color: myWhite,
  },
});

export default PlantsView;
