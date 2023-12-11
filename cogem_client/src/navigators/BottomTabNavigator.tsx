import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TodaySurveyScreen from '../screens/TodaySurveyScreen';
import TodayMissionScreen from '../screens/TodayMissionScreen';
import HomeScreen from '../screens/HomeScreen';
import CognitiveTrainingScreen from '../screens/CognitiveTrainingScreen';
import SurveySettingScreen from '../screens/SurveySettingScreen';

import SurveyIcon from '../assets/svg/bottom_tab_survey.svg';
import MissionIcon from '../assets/svg/bottom_tab_mission.svg';
import HomeIcon from '../assets/svg/bottom_tab_home.svg';
import TrainingIcon from '../assets/svg/bottom_tab_training.svg';
import SettingIcon from '../assets/svg/bottom_tab_setting.svg';

export default function BottomTabNavigator() {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      // eslint-disable-next-line react-native/no-inline-styles
      sceneContainerStyle={{
        backgroundColor: '#2F2F36',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#727272',
        tabBarStyle: {
          height: 81,
          backgroundColor: '#131317',
          position: 'absolute',
          borderTopWidth: 0,
          paddingTop: 6,
          paddingLeft: 21,
          paddingRight: 21,
          paddingBottom: 23,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
      initialRouteName="Survey">
      <BottomTab.Screen
        name="Survey"
        component={TodaySurveyScreen}
        options={{
          tabBarLabel: '오늘의 설문',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => <SurveyIcon name="Survey" fill={props.color} />,
        }}
      />
      <BottomTab.Screen
        name="Mission"
        component={TodayMissionScreen}
        options={{
          tabBarLabel: '오늘의 미션',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => (
            <MissionIcon name="Mission" stroke={props.color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '홈',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => <HomeIcon name="Home" fill={props.color} />,
        }}
      />
      <BottomTab.Screen
        name="Training"
        component={CognitiveTrainingScreen}
        options={{
          tabBarLabel: '인지 훈련',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => (
            <TrainingIcon name="Training" fill={props.color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Setting"
        component={SurveySettingScreen}
        options={{
          tabBarLabel: '측정 설정',
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: props => (
            <SettingIcon name="Setting" fill={props.color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
