import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import uuid from 'react-native-uuid';
import PushNotification from 'react-native-push-notification';

import Header from '../components/Header';
import PlantItem from '../components/flatListRendering/PlantItem';
import DeleteOrCancel from '../components/modals/DeleteOrCancel.js';
import EStyleSheet from 'react-native-extended-stylesheet';

const PlantsView = () => {
  const [plantsStorage, setPlantsStorage] = useStorage('plantss');

  const [plants, setPlants] = useState(plantsStorage ? plantsStorage : []);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deletePlant, setDeletePlant] = useState(null);

  const [openTimeInterval, setOpenTimeInterval] = useState(false);

  useEffect(() => {
    setPlantsStorage(plants);
  }, [plants, setPlantsStorage]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const createPlant = newPlantName => {
    if (plants.length === 10) {
      Alert.alert(
        'Too many notifications',
        'Sorry you cannot have more than 10 notifications at a time',
        [{text: 'OK'}],
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
          interval: '',
        },
      ];
    });

    setOpenTimeInterval(true);
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
      return prevItems.filter(item => item.key !== deletePlant.key);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../components/assets/Plants.jpeg')}
        style={styles.image}>
        <Header title="My Notifications" add={createPlant} />

        <Text style={styles.warning}>
          {`Each notifications will trigger ${globalRepeatNotifications} times before stopping`}
        </Text>
        <ScrollView>
          {plants &&
            plants.map(plant =>
              plant ? (
                <PlantItem
                  key={plant.key}
                  plant={plant}
                  deletion={openDeleteOrCancel}
                  plants={plants}
                  setPlantsStorage={setPlantsStorage}
                  openTimeInterval={openTimeInterval}
                />
              ) : null,
            )}
        </ScrollView>

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
  image: {width: '100%', height: '100%'},
  container: {backgroundColor: myBlack, flex: 1},
  warning: {
    height: EStyleSheet.value('20rem'),
    fontSize: EStyleSheet.value('12rem'),
    textAlign: 'center',
    color: myWhite,
  },
});

export default PlantsView;
