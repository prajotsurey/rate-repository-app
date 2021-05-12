import React from 'react';
import Text from '../Text';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import { FlatList, StyleSheet } from 'react-native';
import View from '../View';
import theme from '../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  mainContainer : {
    marginVertical:10,
    padding:10,
    backgroundColor: 'white'
  },
  ratingContainer: {
    height: 50,
    width: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: theme.colors.primary,
    borderWidth: 5,
    marginRight: 10,
  },
  rightContainer:{
    flexGrow: 4
  },
  background:{
    backgroundColor:theme.colors.backgroundMain
  }
});

const ReviewItem = ({review}) => {
  return(
    <View flexDirection="row" style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <Text>
          {review.rating}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text fontWeight="bold" style={{marginBottom:5}}>
          {review.repository.fullName}
        </Text>
        <Text color="textSecondary" style={{marginBottom:5}}>
          {format(new Date(review.createdAt), "dd.MM.yyyy")}
        </Text>
        <View flexDirection="row" style={{marginBottom:5}}>
          <Text style={{flex:1}}>
            {review.text}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MyReviewsContainer = ({reviews, onEndReach}) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      style={styles.background}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const MyReviews  = () => {
  const  {data, fetchMore} = useAuthorizedUser(true,7);
  const reviews = data
  ? data.reviews.edges.map(r => r.node)
  : [];

  const onEndReach = () => {
    fetchMore();
  };

  return(
    <MyReviewsContainer reviews={reviews} onEndReach={onEndReach}/>
  );
};

export default MyReviews;