import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Alert,
  // Text,
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

  const [deleteAllNotificationsCounter, setDeleteAllNotificationsCounter] =
    useState(0);

  useEffect(() => {
    setPlantsStorage(plants);
  }, [plants, setPlantsStorage]);

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  // const maxNotifications = Math.floor(500 / globalRepeatNotifications);

  const createPlant = (newPlantName, notificationText) => {
    // if (plants.length === 5) {
    // Alert.alert(
    //   'Too many notifications',
    //   `Sorry you cannot have more than ${maxNotifications} notifications at a time`,
    //   [{text: 'OK'}],
    // );
    //   return;
    // }

    setPlants(prevItems => {
      return [
        ...prevItems,
        {
          name: newPlantName,
          key: uuid.v4(),
          notificationId: null,
          interval: '',
          notificationText,
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
      const id = deletePlant.notificationId;
      PushNotification.cancelLocalNotifications({id});

      // [...Array(globalRepeatNotifications)].map((e, i) => {
      // const id = deletePlant.notificationId + i;
      //   PushNotification.cancelLocalNotifications({id});
      // });
    }

    setPlants(prevItems => {
      return prevItems.filter(item => item.key !== deletePlant.key);
    });
  };

  const deleteAllNotifications = () => {
    setDeleteAllNotificationsCounter(deleteAllNotificationsCounter + 1);
    if (deleteAllNotificationsCounter === 5) {
      //delete all notifications
      PushNotification.cancelAllLocalNotifications();

      Alert.alert(
        'All notifications deleted',
        'Please reset your notifications by clicking change reminder',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../components/assets/Plants.jpeg')}
        style={styles.image}>
        <Header
          hiddenIcon={deleteAllNotifications}
          title="My Notifications"
          notificationAdd={createPlant}
        />

        {/* <Text style={styles.warning}>
          {`Each notifications will trigger ${globalRepeatNotifications} times before stopping`}
        </Text> */}
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
                  // maxNotifications={maxNotifications}
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
