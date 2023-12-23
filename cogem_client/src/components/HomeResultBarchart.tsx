import React from 'react';
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
    <ChartComponent>
      <VictoryChart
        domain={{y: [0, 6]}}
        theme={VictoryTheme.material}
        domainPadding={30}>
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
          data={data2}
          cornerRadius={{top: 18, bottom: 18}}
          x="emotion"
          y="value"
          style={{
            data: {
              width: 36,
              fill: '#201C44',
            },
          }}
        />
        <VictoryBar
          data={data1}
          cornerRadius={{top: 18, bottom: 18}}
          x="emotion"
          y="value"
          animate={{
            duration: 1000,
            onLoad: {duration: 3000},
            easing: "bounce"
          }}
          style={{
            data: {
              width: 36,
              fill: ({datum}) => {
                switch (datum.emotion) {
                  case '기쁨':
                    return 'rgba(250, 174, 27, 1)';
                  case '슬픔':
                    return 'rgba(250, 131, 21, 1)';
                  case '분노':
                    return 'rgba(99, 102, 241, 1)';
                  case '공포':
                    return 'rgba(59, 130, 246, 1)';
                  case '혐오':
                    return 'rgba(20, 184, 166, 1)';
                  case '놀람':
                    return 'rgba(93, 180, 112, 1)';
                  default:
                    return 'gray'; // 기본 색상
                }
              },
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
              fill: 'rgba(32, 28, 68, 0.2)',
            },
          }}
        />
      </VictoryChart>
    </ChartComponent>
  );
};

export default HomeResultBarchart;
