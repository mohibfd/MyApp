import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AuthProvider} from './providers/AuthProvider';
import {TasksProvider} from './providers/TasksProvider';

import WelcomeView from './views/WelcomeView';
import PlantsView from './views/PlantsView';
import InvestView from './views/InvestView';
import InvestDetailsView from './views/InvestDetailsView';
import WorkoutView from './views/WorkoutView';
import WorkoutDetailsView from './views/WorkoutDetailsView';
import MeditateView from './views/MeditateView';
import BooksView from './views/BooksView';
import RecipesView from './views/RecipesView';
import RecipeDetailsView from './views/RecipeDetailsView';
import ProductivityView from './views/ProductivityView';
import RemindersView from './views/RemindersView';
import WakeboardingView from './views/WakeboardingView';

import DeveloperView from './views/DeveloperView';

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
          <Stack.Screen
            name="Welcome View"
            component={WelcomeView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Plants View"
            component={PlantsView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Invest View"
            component={InvestView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Invest Details View"
            component={InvestDetailsView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Recipe Details View"
            component={RecipeDetailsView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Workout View"
            component={WorkoutView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Workout Details View"
            component={WorkoutDetailsView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Meditate View"
            component={MeditateView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Books View"
            component={BooksView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Recipes View"
            component={RecipesView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Productivity View"
            component={ProductivityView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Reminders View"
            component={RemindersView}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Wakeboarding View"
            component={WakeboardingView}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Developer View"
            component={DeveloperView}
            options={{headerShown: false}}
          />
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
