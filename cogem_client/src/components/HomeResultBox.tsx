import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';
import {toKoreaISOString} from '../utils/KoreaTime';

import HomeSunIcon from '../assets/svg/home_result_sun.svg';
import HomeBarchartIcon from '../assets/svg/home_result_barchart.svg';
import HomeResultBarchart from '../components/HomeResultBarchart';
import HomeBottomColor from './HomeBottomColor';

const HomeResultBox = ({type}) => {
  const [titleText, setTitleText] = useState('');
  const [subText, setSubText] = useState('');

  const currentDate = toKoreaISOString(new Date()).slice(2, 10); // 'YY-MM-DD'
  const newCurrentDate = currentDate.replaceAll('-', '.'); // 'YY.MM.DD'
  useEffect(() => {
    const fetchUserState = async () => {
      if (type === 'emotion') {
        setTitleText('이것은 감정');
        setSubText(
          '나는 수요일, 밤에 기분이 좋아요. 가끔은 혼자만의 시간을 가지는 것도 당신을 충전시켜줄 수 있어요.',
        );
      } else if (type === 'cognition') {
        setTitleText('이것은 인지');
        setSubText(
          '나는 수요일, 밤에 집중력이 떨어져요. 가끔은 휴식의 시간을 가지는 것도 당신을 충전시켜줄 수 있어요.',
        );
      }
    };
    fetchUserState();
  }, [type]);

  return (
    <EmotionComponentContainer>
      <HeaderContainer>
        <DateText>{newCurrentDate}</DateText>
        <HomeSunIcon width="40px" height="40px" />
        <BarchartIconContainer>
          <HomeBarchartIcon width="25px" height="25px" />
        </BarchartIconContainer>
      </HeaderContainer>
      <Title>{titleText}</Title>
      <Subtitle>{subText}</Subtitle>
      <HomeResultBarchart />
      <HomeBottomColor today={newCurrentDate} />
    </EmotionComponentContainer>
  );
};

export default HomeResultBox;

const EmotionComponentContainer = styled.View`
  background-color: #060419;
  align-items: center;
  justify-content: space-between;
  width: 330px;
  height: 520px;
  margin-top: 20px;
  border-radius: 20px;
`;

// Header
const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
`;
const DateText = styled.Text`
  flex: 1;
  color: #ffffffb2;
  font-family: SF Compact;
  font-size: 14px;
  font-style: normal;
`;
const BarchartIconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

// Title
const Title = styled.Text`
  color: #ffffffed;
  text-align: center;
  font-family: AppleSDGothicNeoSB00;
  font-size: 22px;
  font-style: normal;
  font-weight: bold;
  margin: 15px 0;
`;
const Subtitle = styled.Text`
  color: #ffffff99;
  font-size: 14px;
  text-align: center;
  margin: 0px 10px;
`;
