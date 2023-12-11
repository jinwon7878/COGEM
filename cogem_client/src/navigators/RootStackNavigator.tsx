import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';
import SignInScreen from '../screens/SignInScreen';

import MissionDetailScreen from '../screens/MissionDetailScreen';
import TotalResultsScreen from '../screens/TotalResultsScreen';
import ResultDetailScreen from '../screens/ResultDetailScreen';
import TodayTrainingScreen from '../screens/TodayTrainingScreen';
import TaskCategoryScreen from '../screens/TaskCategoryScreen';
import TaskTypeScreen from '../screens/TaskTypeScreen';

export default function RootStackNavigator() {
  const isSignedIn = true;
  const Stack = createNativeStackNavigator();
  const initialRouteName = isSignedIn ? 'Main' : 'SignIn';
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#2F2F36',
        },
      }}
      initialRouteName={initialRouteName}>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MissionDetail"
            component={MissionDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TotalResults"
            component={TotalResultsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResultDetail"
            component={ResultDetailScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TodayTraining"
            component={TodayTrainingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TaskCategory"
            component={TaskCategoryScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TaskType"
            component={TaskTypeScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}
