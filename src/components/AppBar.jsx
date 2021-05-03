import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  // ...
});

const AppBar = () => {
  return(
  <View style={styles.container}>
    <Pressable>
      <Text fontWeight="bold" fontSize="heading" color="textSecondary">Repositories</Text>
    </Pressable>
  </View>
  );
};

export default AppBar;