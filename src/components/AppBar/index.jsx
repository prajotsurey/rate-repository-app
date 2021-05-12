import React from 'react';
import { StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import Text from '../Text';
import View from '../View';
import { Link, useHistory } from "react-router-native";
import useAuthorizedUser from "../../hooks/useAuthorizedUser";
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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
  const { data } = useAuthorizedUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();
  const signOut = () => {
    console.log('here');
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/signin');
  };

  return(
  <View flexDirection="row" style={styles.container}>
    <ScrollView horizontal>
      <Pressable style={{paddingRight:10}}>
        <Link to="/" style={{paddingRight:10}}>
          <Text fontWeight="bold" fontSize="heading" style={{color:'white'}}>
            Repositories
          </Text>
        </Link>
      </Pressable>
      {data
      ? <>
        <Link to="/create-review" style={{paddingRight:10}}>
          <Text fontWeight="bold" fontSize="heading" style={{color:'white'}}>
            Create-review
          </Text>
        </Link>
        <Link to="/my-reviews" style={{paddingRight:10}}>
          <Text fontWeight="bold" fontSize="heading" style={{color:'white'}}>
            My-reviews
          </Text>
        </Link>
        <Pressable onPress={signOut}>
          <Text fontWeight="bold" fontSize="heading" style={{color:'white'}}>
            Sign-out
          </Text>
        </Pressable>
        </>
      : 
        <>
          <Link to="/signin" style={{paddingRight:10}}>
            <Text fontWeight="bold" fontSize="heading" style={{color:'white'}}>
              Sign-in
            </Text>
          </Link>
          <Link to="/signup" style={{paddingRight:10}}>
            <Text fontWeight="bold" fontSize="heading" style={{color:'white'}}>
              Sign-Up
            </Text>
          </Link>
        </>
      }
    </ScrollView>
  </View>
  );
};

export default AppBar;