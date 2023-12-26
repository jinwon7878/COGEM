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
import NbackScreen from '../tasks/Nback/NbackScreen';
import NbackResult from '../tasks/Nback/NbackResult';

export default function RootStackNavigator() {
  const isSignedIn = true;
  const Stack = createNativeStackNavigator();
  const initialRouteName = isSignedIn ? 'Main' : 'SignIn';
  // 공용 screen options
  const screenOptions = {
    headerShown: false,
    contentStyle: {backgroundColor: '#2F2F36'},
    headerStyle: {
      backgroundColor: '#2F2F36',
    },
    headerTintColor: '#FFF', // 뒤로가기 버튼 색상
    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트 숨기기
    title: '', // 화면 이름 숨기기
  };
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={initialRouteName}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen name="MissionDetail" component={MissionDetailScreen} />
          <Stack.Screen name="TotalResults" component={TotalResultsScreen} />
          <Stack.Screen
            name="ResultDetail"
            component={ResultDetailScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen name="TodayTraining" component={TodayTrainingScreen} />
          <Stack.Screen
            name="TaskCategory"
            component={TaskCategoryScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="TaskType"
            component={TaskTypeScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="NbackTask"
            component={NbackScreen}
            options={{
              headerShown: true,
            }}
          />
          <Stack.Screen name="NbackResult" component={NbackResult} />
        </>
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      )}
    </Stack.Navigator>
  );
}
