import React, {useState, useEffect} from 'react';

import {View, Button, StyleSheet} from 'react-native';
import onlineStyles from '../../stylesheets/onlineStylesheet';

import {Overlay} from 'react-native-elements';
import {ManageTeam} from '../../components/online_components/ManageTeam';

import {useTasks} from '../../providers/TasksProvider';
import {TaskItem} from '../../components/online_components/TaskItem';
import {AddTask} from '../../components/online_components/AddTask';

export function TasksView({navigation, route}) {
  const {name} = route.params;

  const [overlayVisible, setOverlayVisible] = useState(false);

  const {tasks, createTask} = useTasks();
  useEffect(() => {
    navigation.setOptions({
      headerRight: function Header() {
        return <AddTask createTask={createTask} />;
      },
      title: `${name}'s Tasks`,
    });
  }, []);

  return (
    <View>
      {/* <Text>{tasks.length}</Text> */}
      {tasks.map(task =>
        task ? <TaskItem key={`${task._id}`} task={task} /> : null,
      )}

      {name === 'My Project' ? (
        <>
          <View style={styles.manageTeamButtonContainer}>
            <Button
              title="Manage Team"
              onPress={() => setOverlayVisible(true)}
            />
          </View>
          <Overlay
            isVisible={overlayVisible}
            onBackdropPress={() => setOverlayVisible(false)}>
            <ManageTeam />
          </Overlay>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  manageTeamButtonContainer: {
    paddingTop: EStyleSheet.value('50rem'),
    alignSelf: 'center',
    width: '50%',
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    borderBottomWidth: EStyleSheet.value('1rem'),
  },
});
