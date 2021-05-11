import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../../hooks/useRepositories';
import theme from '../../theme';
import RepositoryItem from '../RepositoryItem';
import { Picker } from '@react-native-picker/picker';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.backgroundMain
  }
});

const OrderPicker = ({ orderBy, setOrderBy }) => {
  return(
    <Picker 
      style={{height:60}} 
      onValueChange={(itemValue) => setOrderBy(itemValue)}
      selectedValue={orderBy} 
    >
      <Picker.Item style={{fontColor:'red'}} label="Last reviewed" value="null" />
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highestRated" />
      <Picker.Item label="Lowest rated repositories" value="lowestRated" />
    </Picker>
  );
};

export const RepositoryListContainer = ({ repositories,  orderBy, setOrderBy }) => {
  
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({item}) => {
    const onPress = () => {
      history.push(`/repository/${item.id}`);
    };
    return(
      <Pressable onPress={onPress}>
        <RepositoryItem item={item} showButton={false}/>
      </Pressable>
    );
  };
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item)=>item.id}
      style={styles.container}
      ListHeaderComponent={() => <OrderPicker orderBy = {orderBy} setOrderBy={setOrderBy}/>}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(null);
  const {repositories} = useRepositories(orderBy);

  return <RepositoryListContainer repositories={repositories} orderBy = {orderBy} setOrderBy={setOrderBy} />;
};

export default RepositoryList;