import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import styles from './LoaderStyle';
import Colors from '../../styles/colors';

const onIOS = Platform.OS === 'ios';

const Loader = ({show, type}) => {
  return (
    <Modal visible={show} transparent={true}>
      <SafeAreaView>
        <View style={styles.container}>
          <ActivityIndicator
            size='large'
            color={Colors.primaryGreen1}
            style={{fontSize: 100}}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Loader;