import React from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';

const data1 = [
  {emotion: '기쁨', value: 6},
  {emotion: '슬픔', value: 2},
  {emotion: '분노', value: 3},
  {emotion: '공포', value: 4},
  {emotion: '혐오', value: 2},
  {emotion: '놀람', value: 5},
];
const data2 = [
  {emotion: '기쁨', value: 4},
  {emotion: '슬픔', value: 3},
  {emotion: '분노', value: 2},
  {emotion: '공포', value: 3},
  {emotion: '혐오', value: 4},
  {emotion: '놀람', value: 2},
];

const ChartComponent = styled.View`
  width: 330px;
  height: 290px;
  justify-content: center;
  align-items: center;
`;

const HomeResultBarchart = () => {
  return (
    <View>
      <ChartComponent>
        <VictoryChart
          domain={{y: [0, 6]}}
          theme={VictoryTheme.material}
          domainPadding={30}
          animate={{
            duration: 1000,
            onLoad: {duration: 500},
          }}
          style={{
            parent: {border: '2px solid #ccc'},
            data: {fill: '#c43a31'},
          }}>
          <VictoryAxis
            style={{
              ticks: {stroke: 'none', size: 0},
              grid: {stroke: 'none'},
              axis: {stroke: 'rgba(255, 255, 255, 0.18)', strokeWidth: 1},
              tickLabels: {fill: 'white'},
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={x => `${x}`}
            style={{
              ticks: {stroke: 'none', size: 0},
              grid: {
                stroke: 'rgba(255, 255, 255, 0.18)',
                strokeWidth: 1,
                strokeDasharray: 'none',
              },
              axis: {stroke: 'none'},
              tickLabels: {fill: 'none'},
            }}
          />
          <VictoryBar
            data={data1}
            cornerRadius={{top: 18, bottom: 18}}
            x="emotion"
            y="value"
            style={{
              data: {
                width: 36,
                fill: 'rgba(255, 184, 0, 0.5)',
                strokeWidth: 1, // 막대의 테두리 두께
                stroke: '#FFF',
              },
            }}
          />
          <VictoryBar
            data={data2}
            cornerRadius={{top: 18, bottom: 18}}
            x="emotion"
            y="value"
            style={{
              data: {
                width: 36,
                fill: 'rgba(112, 115, 255, 0.80)',
                strokeWidth: 1, // 막대의 테두리 두께
                stroke: '#FFF',
              },
            }}
          />
        </VictoryChart>
      </ChartComponent>
    </View>
  );
};

export default HomeResultBarchart;
