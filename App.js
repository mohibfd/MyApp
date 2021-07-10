import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthProvider} from './providers/AuthProvider';
import {TasksProvider} from './providers/TasksProvider';

import {WelcomeView} from './views/WelcomeView';
import {PlantsView} from './views/PlantsView';
import {OnlineView} from './views/online_views/OnlineView';
import {ProjectsView} from './views/online_views/ProjectsView';
import {TasksView} from './views/online_views/TasksView';

import {Logout} from './components/online_components/Logout';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{headerShown: false}}
        >
          <Stack.Screen name="Welcome View" component={WelcomeView} />
          <Stack.Screen name="Plants View" component={PlantsView} />

          <Stack.Screen
            name="Online View"
            component={OnlineView}
            options={{title: 'Task Tracker'}}
          />
          <Stack.Screen
            name="Projects"
            component={ProjectsView}
            title="ProjectsView"
            headerBackTitle="log out"
            options={{
              headerLeft: function Header() {
                return <Logout />;
              },
            }}
          />
          <Stack.Screen name="Task List">
            {props => {
              const {navigation, route} = props;
              const {user, projectPartition} = route.params;
              return (
                <TasksProvider user={user} projectPartition={projectPartition}>
                  <TasksView navigation={navigation} route={route} />
                </TasksProvider>
              );
            }}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
