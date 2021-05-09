import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';
import View from '../View';
import Text from '../Text';
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

const RepositoryInfo = ({repository}) => {

  if(!repository){
    return null;  
  }
  return(
    <RepositoryItem item={repository} showButton={true}/>
  );
};

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
          {review.user.username}
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

const SingleRepository = () => {
  const { slug } = useParams();
  const { repository } = useRepository(slug);
  const reviews = repository
  ? repository.reviews.edges.map(edge => edge.node)
  : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository = {repository} />}
      style={styles.background}
    />
  );
};

export default SingleRepository;