import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from '../RepositoryList';
import AppBar from '../AppBar';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from '../SignIn';
import SingleRepository from '../SingleRepositoryView';
import CreateReview from '../CreateReview';
import SignUp from '../SignUp';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/repository/:slug">
          {console.log('here')}
          <SingleRepository /> 
        </Route>
        <Route path="/create-review">
          <CreateReview/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/">
          <RepositoryList/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    </View>
  );
};

export default Main;