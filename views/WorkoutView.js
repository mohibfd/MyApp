import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import uuid from 'react-native-uuid';

import Header from '../components/Header';
import WorkoutModal from '../components/modals/WorkoutModal';
import WorkoutItem from '../components/flatListRendering/WorkoutItem';

const WorkoutView = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const differentMuscles = [
    {name: 'Arms', key: uuid.v4()},
    {name: 'Shoulders', key: uuid.v4()},
    {name: 'Legs', key: uuid.v4()},
    {name: 'Chest', key: uuid.v4()},
    {name: 'Back', key: uuid.v4()},
    {name: 'Abs', key: uuid.v4()},
  ];

  const renderItem = item => {
    return <WorkoutItem muscle={item.item.name} navigation={navigation} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Workouts" cameraAdd={() => setModalVisible(true)} />

      <View style={styles.lineDivider} />

      <ImageBackground
        source={require('../components/assets/Workout.jpeg')}
        style={styles.image}>
        <FlatList data={differentMuscles} renderItem={renderItem} />
      </ImageBackground>

      {modalVisible && (
        <WorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  lineDivider: {
    borderBottomWidth: EStyleSheet.value('2rem'),
    borderColor: myRed,
  },
  image: {width: '100%', height: '100%'},
});

export default WorkoutView;
