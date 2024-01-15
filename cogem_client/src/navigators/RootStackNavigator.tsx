import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabNavigator from './BottomTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import MissionDetailScreen from '../screens/MissionDetailScreen';
import TotalResultsScreen from '../screens/TotalResultsScreen';
import ResultDetailScreen from '../screens/ResultDetailScreen';
import TodayTrainingScreen from '../screens/TodayTrainingScreen';
import TaskCategoryScreen from '../screens/TaskCategoryScreen';
import TaskTypeScreen from '../screens/TaskTypeScreen';
import NbackDescription from '../tasks/Nback/NbackDescription';
import NbackScreen from '../tasks/Nback/NbackScreen';
import NbackResult from '../tasks/Nback/NbackResult';

export default function RootStackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const Stack = createNativeStackNavigator();
  const initialRouteName = isSignedIn ? 'Main' : 'SignIn';

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userInfoString = await AsyncStorage.getItem('@user:userInfo');
        if (userInfoString !== null) {
          // 사용자 정보가 있으면 로그인 상태로 설정
          const userInfo = JSON.parse(userInfoString);
          console.log('[autoLogin] userInfo = ', userInfo);
          setIsSignedIn(true);
        }
      } catch (error) {
        // 오류 처리
        console.error('[autoLogin] AsyncStorage에서 userInfo를 가져오는데 실패했습니다: ', error);
      }
    };

    checkLoginStatus();
  }, []);

  // 공용 screen options
  const screenOptions = {
    headerShown: false,
    contentStyle: {backgroundColor: '#2F2F36'},
    headerStyle: {
      backgroundColor: '#2F2F36',
    },
    headerTintColor: '#FFF', // 뒤로가기 버튼 색상
    headerBackTitleVisible: false, // 뒤로가기 버튼 옆의 텍스트 숨기기
    // headerBackTitle: '홈으로',
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
            name="NbackDescription"
            component={NbackDescription}
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
        <>
          <Stack.Screen name="SignIn">
            {props => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: true,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
