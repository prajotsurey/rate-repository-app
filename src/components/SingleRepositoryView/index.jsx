import React from 'react';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';

const SingleRepository = () => {
  const { slug } = useParams();
  const { repository } = useRepository(slug);
  return(
    <RepositoryItem item={repository} showButton={true}/>
  );
};

export default SingleRepository;