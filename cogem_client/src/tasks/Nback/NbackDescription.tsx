import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function NbackDescription({navigation, route}) {
  const {nLevel} = route.params;
  const handleTask = () => {
    navigation.navigate('NbackTask', {nLevel: nLevel});
  };
  return (
    <View>
      <TouchableOpacity style={{height: 100}} onPress={handleTask} />
      <Text>NbackDescription</Text>
    </View>
  );
}
