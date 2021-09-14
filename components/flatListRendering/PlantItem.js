import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {ActionSheet} from './../online_components/ActionSheet';
import TimeInterval from '../TimeInterval';
import PushNotification from 'react-native-push-notification';
import EStyleSheet from 'react-native-extended-stylesheet';

const PlantItem = ({
  plant,
  deletion,
  plants,
  setPlantsStorage,
  openTimeInterval,
}) => {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [timeIntervalAction, setTimeIntervalAction] = useState(
    openTimeInterval ? 'add' : '',
  );

  const [showTimeInterval, setShowTimeInterval] = useState(openTimeInterval);

  const toggleShowTimeInterval = () => {
    setShowTimeInterval(!showTimeInterval);
  };

  const actions = [
    {
      title: 'Delete notification',
      action: () => {
        deletion(plant);
      },
    },
  ];

  const changeReminder = action => {
    toggleShowTimeInterval();
    setTimeIntervalAction(action);
  };

  if (!plant.notificationId) {
    actions.push({
      title: 'Set reminder',
      action: () => changeReminder('add'),
    });
  } else {
    actions.push({
      title: 'Change reminder',
      action: () => changeReminder('edit'),
    });
  }

  const createTimeInterval = (notificationId, interval) => {
    for (let i of plants) {
      if (i.key === plant.key) {
        i.notificationId = notificationId;
        i.interval = interval;
      }
    }
    setPlantsStorage(plants);
  };

  const deleteTimeInterval = () => {
    [...Array(globalRepeatNotifications)].map((e, i) => {
      const id = plant.notificationId + i;
      PushNotification.cancelLocalNotifications({id});
    });

    //delete all notifications
    // PushNotification.cancelAllLocalNotifications();

    for (let i of plants) {
      if (i.key === plant.key) {
        i.notificationId = null;
      }
    }

    setPlantsStorage(plants);
  };

  //the margin left is the size of the icon
  const marginLeft = plant.notificationId ? EStyleSheet.value('40rem') : 0;

  const windowHeightMinusWarning =
    Dimensions.get('window').height - EStyleSheet.value('20rem');

  const height = windowHeightMinusWarning * 0.1324;

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          setActionSheetVisible(false);
        }}
        actions={actions}
      />

      <ListItem
        onPress={() => {
          setActionSheetVisible(true);
        }}
        containerStyle={[styles.container, {height}]}
        bottomDivider>
        <ListItem.Content style={styles.listItemContainer}>
          <View style={styles.insideContainer}>
            <Text style={[styles.plantName, {marginLeft}]} numberOfLines={1}>
              {plant.name}
            </Text>
            {plant.notificationId && (
              <Icon
                name="check"
                size={EStyleSheet.value('40rem')}
                color={'#00FF004D'}
              />
            )}
          </View>
          <Text style={styles.text}>{plant.interval}</Text>
        </ListItem.Content>
      </ListItem>
      {showTimeInterval && (
        <TimeInterval
          createTimeInterval={createTimeInterval}
          closeModal={toggleShowTimeInterval}
          plant={plant}
          timeIntervalAction={timeIntervalAction}
          deleteTimeInterval={deleteTimeInterval}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: myGreen + '99',
  },
  text: {
    color: myRed,
  },
  listItemContainer: {
    alignItems: 'center',
  },
  insideContainer: {
    flexDirection: 'row',
  },
  plantName: {
    flex: 1,
    fontSize: EStyleSheet.value('30rem'),
    color: myWhite,
    textAlign: 'center',
  },
});

TimeInterval.defaultProps = {
  delete: null,
  plants: null,
  setPlantsStorage: null,
  openTimeInterval: null,
};

TimeInterval.propTypes = {
  plant: PropTypes.object.isRequired,
  deletion: PropTypes.func,
  plants: PropTypes.array,
  setPlantsStorage: PropTypes.func,
  openTimeInterval: PropTypes.bool,
};

export default PlantItem;
