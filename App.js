/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {store, persistor} from './src/redux/store';
import Routing from './src/navigations/Routing';
// import Routing from './src/screen/Main';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor='aqua'
        />
        <SafeAreaView style={styles.container}>
          <Routing />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

console.disableYellowBox = true;
