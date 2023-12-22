import React from 'react';

import styled from '@emotion/native';

const AllColorContainer = styled.View`
  justify-content: center;
  align-items: flex-end;
  margin: 15px;
`;
const ColorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BottomText = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
  margin-left: 5px;
  color: rgba(255, 255, 255, 0.8);
`;

const Circle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.color || 'blue'};
`;

const HomeBottomColor = () => {
  return (
    <AllColorContainer>
      <ColorContainer>
        <Circle color="rgba(255, 184, 0, 0.8)" />
        <BottomText>측정값</BottomText>
      </ColorContainer>
      <ColorContainer>
        <Circle color="#201C44" />
        <BottomText>평균값</BottomText>
      </ColorContainer>
    </AllColorContainer>
  );
};

export default HomeBottomColor;
