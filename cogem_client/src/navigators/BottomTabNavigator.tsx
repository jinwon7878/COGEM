import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TodaySurveyScreen from '../screens/TodaySurveyScreen';
import TodayMissionScreen from '../screens/TodayMissionScreen';
import HomeScreen from '../screens/HomeScreen';
import CognitiveTrainingScreen from '../screens/CognitiveTrainingScreen';
import SurveySettingScreen from '../screens/SurveySettingScreen';

export default function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen name="Survey" component={TodaySurveyScreen} />
      <BottomTab.Screen name="Mission" component={TodayMissionScreen} />
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Training" component={CognitiveTrainingScreen} />
      <BottomTab.Screen name="Settings" component={SurveySettingScreen} />
    </BottomTab.Navigator>
  );
}
