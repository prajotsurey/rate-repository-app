import React, { useState } from 'react';
import { FlatList, StyleSheet, Pressable, TextInput } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../../hooks/useRepositories';
import theme from '../../theme';
import RepositoryItem from '../RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import View from '../View';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.backgroundMain
  },
  inputContainer: {
    padding:10,
    backgroundColor: theme.colors.backgroundMain
  },

  formInput:{
    borderRadius:5,
    padding:10,
    fontSize:17,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
      },
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

const Filter = ({filter, setFilter}) => {

  return(
    <View style={styles.inputContainer}>
      <TextInput
      style={styles.formInput}
      onChangeText={text => setFilter(text)}
      value={filter} 
      />
    </View>
  );
};

export const RepositoryListContainer = ({ repositories,  orderBy, setOrderBy, filter, setFilter }) => {
  
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
    <>
      <Filter filter={filter} setFilter={setFilter}/>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item)=>item.id}
        style={styles.container}
        ListHeaderComponent={() => <OrderPicker orderBy = {orderBy} setOrderBy={setOrderBy}/>}
      />
    </>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(null);
  const [filter, setFilter] = useState('');
  const [debouncedFilter] = useDebounce(filter, 500);
  const {repositories} = useRepositories(orderBy, debouncedFilter);
  return <RepositoryListContainer repositories={repositories} orderBy = {orderBy} setOrderBy={setOrderBy} filter={filter} setFilter={setFilter} />;
};

export default RepositoryList;