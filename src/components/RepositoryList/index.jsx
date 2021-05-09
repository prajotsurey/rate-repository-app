import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router';
import useRepositories from '../../hooks/useRepositories';
import theme from '../../theme';
import RepositoryItem from '../RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.backgroundMain
  }
});

export const RepositoryListContainer = ({ repositories }) => {
  
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
      keyExtractor={(item)=>item.description}
      style={styles.container}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {repositories} = useRepositories();

  return <RepositoryListContainer repositories={repositories}/>;
};

export default RepositoryList;