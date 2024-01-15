import React from 'react';
import {View, Text} from 'react-native';
import styled from '@emotion/native';

import HomeProfileIcon from '../assets/svg/home_profile_image.svg';

const HomeHeaderProfile = () => {
  return (
    <HeaderMinorContainer>
      <View style={{marginLeft: 20}}>
        <HomeProfileIcon width="26px" height="30px" fill={'#FFF'} />
      </View>
      <WelcomeContainer>
        <WelcomeText>안녕하세요,</WelcomeText>
        <WelcomeIdText>sampleid@cogem.com님</WelcomeIdText>
      </WelcomeContainer>
    </HeaderMinorContainer>
  );
};

export default HomeHeaderProfile;

const HeaderMinorContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const WelcomeContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;
const WelcomeText = styled.Text`
  color: #e8e8e8;
  font-family: AppleSDGothicNeoSB00;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
const WelcomeIdText = styled.Text`
  color: #acacac;
  font-family: AppleSDGothicNeoSB00;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;
