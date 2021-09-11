import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import generalStyles from '../stylesheets/generalStylesheet';

import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  TextInput,
} from 'react-native';
import uuid from 'react-native-uuid';
import WorkoutItem from '../components/flatListRendering/WorkoutItem';
import {Overlay} from 'react-native-elements';

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [repOne, setRepOne] = useState();

  const [repTwo, setRepTwo] = useState();

  const [repThree, setRepThree] = useState();

  const [repFour, setRepFour] = useState();

  const [repFive, setRepFive] = useState();

  // eslint-disable-next-line no-unused-vars
  const [keyboardStatus, setKeyboardStatus] = useKeyboardState();

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
    setIsAddModalOpen(false);
    setWorkouts(prevItems => {
      return [
        ...prevItems,
        {
          name: '',
          key: uuid.v4(),
          minimumWeight: '',
          maximumWeight: '',
          measurement: 'kg',
          reps: [repOne, repTwo, repThree, repFour, repFive],
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

  const bottom = keyboardStatus === 'Keyboard Shown' ? '10%' : null;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={muscle} instantAdd={() => setIsAddModalOpen(true)} />
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
      {isAddModalOpen && (
        <Overlay
          isVisible={true}
          overlayStyle={[
            styles.overlay,
            generalStyles.borderContainer,
            {bottom},
          ]}
          onBackdropPress={() => setIsAddModalOpen(false)}>
          <>
            <Text style={styles.overlayText}>How many reps?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={repOne}
                onChangeText={setRepOne}
                maxLength={1}
                keyboardType="numeric"
              />

              <Text style={styles.overlaySlash}>/</Text>
              <TextInput
                style={styles.input}
                value={repTwo}
                onChangeText={setRepTwo}
                maxLength={1}
                keyboardType="numeric"
              />

              <Text style={styles.overlaySlash}>/</Text>
              <TextInput
                style={styles.input}
                value={repThree}
                onChangeText={setRepThree}
                maxLength={1}
                keyboardType="numeric"
              />

              <Text style={styles.overlaySlash}>/</Text>
              <TextInput
                style={styles.input}
                value={repFour}
                onChangeText={setRepFour}
                maxLength={1}
                keyboardType="numeric"
              />

              <Text style={styles.overlaySlash}>/</Text>
              <TextInput
                style={styles.input}
                value={repFive}
                onChangeText={setRepFive}
                maxLength={1}
                keyboardType="numeric"
              />
            </View>
            <Pressable
              style={[generalStyles.darkButtonContainer, styles.overlayButton]}
              onPress={createWorkout}>
              <Text style={generalStyles.textStylesDark}>Create</Text>
            </Pressable>
          </>
        </Overlay>
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
    height: EStyleSheet.value('50rem'),
    borderColor: myRed,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    height: EStyleSheet.value('200rem'),
    flex: 1,
    position: 'absolute',
  },
  overlayText: {
    fontSize: EStyleSheet.value('25rem'),
    alignSelf: 'center',
    color: myWhite,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: 'gold',
    borderBottomColor: 'gold',
    borderWidth: 2,
    color: 'white',
    fontSize: EStyleSheet.value('25rem'),
    height: '60%',
    width: EStyleSheet.value('25rem'),
  },
  overlaySlash: {
    color: 'white',
    fontSize: EStyleSheet.value('25rem'),
    // height: '60%',
  },
  overlayButtonContainer: {flex: 1},
  overlayButton: {alignSelf: 'center', bottom: 0},
});
WorkoutDetailsView.propTypes = {
  route: PropTypes.object.isRequired,
};

export default WorkoutDetailsView;
