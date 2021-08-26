import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import uuid from 'react-native-uuid';
import WorkoutItem from '../components/flatListRendering/WorkoutItem';

import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import EStyleSheet from 'react-native-extended-stylesheet';

const WorkoutDetailsView = ({route}) => {
  const {muscle} = route.params;

  const [workoutsStorage, setWorkoutsStorage] = useStorage(`${muscle}`);

  const [workouts, setWorkouts] = useState(
    workoutsStorage ? workoutsStorage : [],
  );

  const isMountedRef = useRef(null);

  const [isDeleteOrCancel, setIsDeleteOrCancel] = useState(false);

  const [deleteItem, setDeleteItem] = useState(null);

  const [refresh, setRefresh] = useState('');

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setWorkoutsStorage(workouts);
    }
    return (isMountedRef.current = false);
  }, [workouts, refresh, setWorkoutsStorage]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef) {
      setWorkouts(workouts);
    }
    return (isMountedRef.current = false);
  }, [refresh, workouts]);

  const createWorkout = () => {
    setWorkouts(prevItems => {
      return [
        ...prevItems,
        {
          name: '',
          key: uuid.v4(),
          minimumWeight: 0,
          maximumWeight: 0,
          measurement: 'kg',
          sets: '',
          reps: '',
        },
      ];
    });
  };

  const toggleDeleteOrCancel = () => {
    setIsDeleteOrCancel(!isDeleteOrCancel);
  };

  const openDeleteOrCancel = mainItem => {
    toggleDeleteOrCancel();
    setDeleteItem(mainItem);
  };

  const completeDeletion = () => {
    toggleDeleteOrCancel();

    MMKV.removeItem(deleteItem.name + 'Id');

    setWorkouts(prevItems => {
      return prevItems.filter(item => item != deleteItem);
    });
  };

  const renderItem = item => {
    return (
      <WorkoutItem
        deleteItemFromStorage={openDeleteOrCancel}
        workout={item.item}
        refresh={setRefresh}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: myBlack}}>
      <Header title={muscle} instantAdd={createWorkout} />
      <ImageBackground
        source={require('../components/assets/Workout.jpeg')}
        style={styles.image}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, styles.marginLeft]}>Excercise</Text>
          <Text style={styles.text}>Min /</Text>
          <Text style={[styles.text, styles.paddingRight]}> Max</Text>
        </View>
        <View style={styles.lineDivider} />

        <FlatList data={workouts} renderItem={renderItem} />
      </ImageBackground>

      {isDeleteOrCancel && (
        <DeleteOrCancel
          name={deleteItem.name}
          deletion={completeDeletion}
          closeOverlay={toggleDeleteOrCancel}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lineDivider: {
    borderBottomWidth: EStyleSheet.value('2rem'),
    borderColor: myRed,
  },
  text: {
    fontSize: EStyleSheet.value('20rem'),
    color: 'white',
  },
  marginLeft: {
    flex: 1.2,
    marginLeft: EStyleSheet.value('10rem'),
  },
  paddingRight: {
    flex: 1,
    paddingRight: EStyleSheet.value('15rem'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
WorkoutDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default WorkoutDetailsView;
