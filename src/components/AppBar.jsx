import React from 'react';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import View from './View';
import { Link } from "react-router-native";
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
  <View flexDirection="row" style={styles.container}>
    <ScrollView horizontal>
      <Pressable style={{paddingRight:10}}>
        <Text fontWeight="bold" fontSize="heading" color="textSecondary">
          Repositories
        </Text>
      </Pressable>
      <Link to="/signin" style={{paddingRight:10}}>
        <Text fontWeight="bold" fontSize="heading" color="textSecondary">
          Sign-in
        </Text>
      </Link>
    </ScrollView>
  </View>
  );
};

export default AppBar;