import React, {useState, useEffect} from 'react';
import styled from '@emotion/native';

import HomeSunIcon from '../assets/svg/home_result_sun.svg';
import HomeBarchartIcon from '../assets/svg/home_result_barchart.svg';
import HomeResultBarchart from '../components/HomeResultBarchart';

const EmotionComponentContainer = styled.View`
  background-color: #060419;
  align-items: center;
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

const HomeResultBox = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    setCurrentDate(month + '.' + date);
  }, []);

  return (
    <EmotionComponentContainer>
      <HeaderContainer>
        <DateText>{currentDate}</DateText>
        <HomeSunIcon width="40px" height="40px" />
        <BarchartIconContainer>
          <HomeBarchartIcon width="25px" height="25px" />
        </BarchartIconContainer>
      </HeaderContainer>
      <Title>활기찬 에너지</Title>

      <Subtitle>
        나는 수요일, 밤에 기분이 좋아요. 가끔은 혼자만의 시간을 가지는 것도
        당신을 충전시켜줄 수 있어요.
      </Subtitle>
      <HomeResultBarchart />
    </EmotionComponentContainer>
    
  );
};

export default HomeResultBox;
