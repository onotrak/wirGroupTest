import {StyleSheet} from 'react-native';
import Colors from './colors';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.blue4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 4,
  },
  shadowTop: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(46, 50, 132, 0.15)',
    shadowColor: 'rgba(46, 50, 132, 0.15)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default styles;
