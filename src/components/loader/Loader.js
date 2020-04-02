import React from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import styles from './LoaderStyle';

const onIOS = Platform.OS === 'ios';

const Loader = ({show, type}) => {
  return (
    <Modal visible={show} transparent={true}>
      <SafeAreaView>
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color='aqua'
            style={{fontSize: 30}}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default Loader;