import React from 'react';
import Text from '../Text';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';
import { FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import View from '../View';
import theme from '../../theme';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import useDeleteReview from '../../hooks/useDeleteReview';

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
  },
  buttonContainer:{
  },
  button:{
    display: 'flex',
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius:5,
  },
  ViewButton:{
    marginRight:5,
    backgroundColor:theme.colors.primary,
  },
  DeleteButton:{
    marginLeft:5,
    backgroundColor:"red",
  }
});

const ReviewItem = ({review, refetch}) => {
  const history = useHistory();
  const { deleteReview } = useDeleteReview();

  const viewRepo = () => {
    history.push(`/repository/${review.repositoryId}`);
  };

  const deleteReviewHandler = async() => {
    await deleteReview(review.id);
    refetch();
  };

  const deleteReviewAlert = () =>
    Alert.alert(
      "Delele Review",
      "Are you sure you want to delete this review",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete", 
          onPress: deleteReviewHandler
        }
      ]
    );

  return(
    <View style={styles.mainContainer}>
      <View flexDirection="row" >
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
      <View flexDirection='row' styles={styles.buttonContainer}>
        <Pressable style={{...styles.button, ...styles.ViewButton}} onPress={viewRepo}>
          <Text fontWeight="bold" style={{color:"white"}}>
            View Repository
          </Text>
        </Pressable>
        <Pressable style={{...styles.button, ...styles.DeleteButton}} onPress={deleteReviewAlert}>
          <Text fontWeight="bold" style={{color:"white"}}>
            Delete Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviewsContainer = ({reviews, onEndReach, refetch}) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
      style={styles.background}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const MyReviews  = () => {
  const  {data, fetchMore, refetch} = useAuthorizedUser(true,7);
  const reviews = data
  ? data.reviews.edges.map(r => r.node)
  : [];

  const onEndReach = () => {
    fetchMore();
  };

  return(
    <MyReviewsContainer reviews={reviews} onEndReach={onEndReach} refetch={refetch}/>
  );
};

export default MyReviews;