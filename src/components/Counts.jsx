import React from 'react';
import Text from './Text';
import View from './View';

const Counts = ({item}) => {

  const converter = (value) => {
    if(value >= 1000) {
      return String((value/1000).toFixed(1)) + 'k';
    }
    return value;
  };


  return(
    <View flexDirection="row" justifyContent="space-between">
      <View alignItems="center">
        <Text fontWeight='bold'>
        {converter(item.stargazersCount)}
        </Text>
        <Text color="textSecondary" >
        Stars
        </Text>
      </View>
      <View alignItems="center">
        <Text fontWeight='bold'>
        {converter(item.forksCount)}
        </Text>
        <Text color="textSecondary" > 
        Forks
        </Text>
      </View>
      <View alignItems="center">
        <Text fontWeight='bold'>
        {converter(item.reviewCount)}
        </Text>
        <Text color="textSecondary" >
        Reviews 
        </Text>
      </View>
      <View alignItems="center">
        <Text fontWeight='bold'>
        {item.ratingAverage}
        </Text>
        <Text color="textSecondary" >
        Rating
        </Text>
      </View>
    </View>
  );

};

export default Counts;