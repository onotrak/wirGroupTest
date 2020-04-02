/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './LineHorizontalStyle';
import Colors from '../../styles/colors';

const LineHorizontal = ({color, size, style}) => {
  return (
    <View
      style={[
        styles.lineStyle,
        style,
        {
          borderTopColor: color ? color : Colors.primaryGreen4,
          borderTopWidth: size ? size : 1,
        },
      ]}
    />
  );
};

export default LineHorizontal;
