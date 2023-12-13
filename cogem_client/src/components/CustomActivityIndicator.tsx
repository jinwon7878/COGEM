import {ActivityIndicator, View} from 'react-native';
import styled from '@emotion/native';
import React from 'react';

const LoadingContainer = styled(View)(props => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.overlayColor || 'rgba(0,0,0,0.3)', // Optional: overlay color with transparency
}));

export default function CustomActivityIndicator({size, color, overlayColor}) {
  return (
    <LoadingContainer overlayColor={overlayColor}>
      <ActivityIndicator size={size} color={color} />
    </LoadingContainer>
  );
}
