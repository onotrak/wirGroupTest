/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import styles from './LineVerticalStyle';
import Colors from '../../styles/colors';

const LineVertical = ({color, size, style}) => {
  return (
    <View
      style={[
        styles.lineStyle,
        style,
        {
          borderRightColor: color ? color : Colors.primaryGreen4,
          borderRightWidth: size ? size : 1,
        },
      ]}
    />
  );
};

export default LineVertical;
