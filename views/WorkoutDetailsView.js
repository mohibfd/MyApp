import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
} from 'react-native';
import uuid from 'react-native-uuid';
import WorkoutItem from '../components/flatListRendering/WorkoutItem';

import Header from '../components/Header';
import DeleteOrCancel from '../components/modals/DeleteOrCancel';
import EStyleSheet from 'react-native-extended-stylesheet';
import ShakeAnimation from '../components/ShakeAnimation';

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

  const [focus, setFocus] = useState(false);

  const [inEditMode, setInEditMode] = useState(false);

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
          minimumWeight: '',
          maximumWeight: '',
          measurement: 'kg',
          sets: '',
          reps: '',
        },
      ];
    });
    setFocus(true);
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
      return prevItems.filter(item => item !== deleteItem);
    });
  };

  const renderItem = item => {
    return (
      <WorkoutItem
        deleteItemFromStorage={openDeleteOrCancel}
        workout={item.item}
        refresh={setRefresh}
        focus={focus}
        inEditMode={inEditMode}
      />
    );
  };

  const animationStyle = ShakeAnimation(inEditMode);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={muscle} instantAdd={createWorkout} />
      <ImageBackground
        source={require('../components/assets/Workout.jpeg')}
        style={styles.image}>
        <View style={styles.headerContainer}>
          <Text style={[styles.text, styles.marginLeft]}>Excercise</Text>
          <Text style={styles.text}>Min /</Text>
          <Text style={[styles.text, styles.paddingRight]}> Max</Text>
        </View>
        <View style={styles.lineDivider} />

        <Pressable
          style={styles.pressable}
          onLongPress={() => {
            setInEditMode(true);
          }}>
          <Animated.View style={animationStyle}>
            <FlatList data={workouts} renderItem={renderItem} />
          </Animated.View>
        </Pressable>

        {inEditMode && (
          <Pressable
            style={styles.footerContainer}
            onPress={() => setInEditMode(false)}>
            <Text style={styles.text}>Exit edit mode</Text>
          </Pressable>
        )}
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
  container: {
    flex: 1,
    backgroundColor: myBlack,
  },
  headerContainer: {flexDirection: 'row', paddingVertical: '2%'},
  lineDivider: {
    borderBottomWidth: EStyleSheet.value('2rem'),
    borderColor: myRed,
  },
  pressable: {
    flex: 1,
  },
  text: {
    fontSize: EStyleSheet.value('20rem'),
    color: 'white',
  },
  marginLeft: {
    flex: 1.5,
    marginLeft: EStyleSheet.value('10rem'),
  },
  paddingRight: {
    flex: 1,
    paddingRight: EStyleSheet.value('15rem'),
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  footerContainer: {
    // backgroundColor: '#CD7F32' + 'CC',
    height: EStyleSheet.value('50rem'),
    borderColor: myRed,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
WorkoutDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default WorkoutDetailsView;
