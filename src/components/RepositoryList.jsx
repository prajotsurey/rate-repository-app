import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.colors.backgroundMain
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {repositories} = useRepositories();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderItem = ({item}) => {
    return(<RepositoryItem item={item}/>);
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

export default RepositoryList;