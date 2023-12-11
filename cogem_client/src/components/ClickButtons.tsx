import {View, Text} from 'react-native';
import React from 'react';
import UncheckedButton from '../assets/svg/radio_unchecked.svg';
import CheckedButton from '../assets/svg/radio_checked.svg';

export default function ClickButtons() {
  return (
    <View>
      <Text>ClickButtons</Text>
      <UncheckedButton width={32} height={32} stroke={'#7240FF'} />
      <CheckedButton width={44} height={44} fill={'#63DAFF'} />
    </View>
  );
}
