import React from 'react';
import { StyleSheet, Image,  Button } from 'react-native';
import Counts from '../Counts';
import View from '../View';
import Text from '../Text';
import theme from '../../theme';
import * as WebBrowser from 'expo-web-browser';

const RepositoryItem = ({item, showButton}) => {

  const styles = StyleSheet.create({
    cardContainer: {
      padding:10,
      backgroundColor: "white",
      marginBottom: 10,
    },
    avatar:{
      width: 50,
      height: 50,
      borderRadius: 3,
      marginRight: 10
    },
    languageContainer:{
      padding:5,
      backgroundColor:theme.colors.primary,
      flexGrow:0,
      borderRadius:5,
      marginBottom:5
    },
    buttonStyle:{
      padding:5,
      backgroundColor:theme.colors.primary,
      flexGrow:0,
      borderRadius:5,
      marginTop:5,
      marginBottom:5,
    }
  });

  const openLink = () => {
    WebBrowser.openBrowserAsync(item.url);
  };

    return(
      <View style={styles.cardContainer} >
        <View flexDirection="row" style={{marginBottom:7}}>
          <Image 
            style={styles.avatar}
            source={{
              uri: item.ownerAvatarUrl
            }}/>
          <View alignItems="start" style={{flexGrow:4}}>
            <View flexDirection="row" style={{marginBottom:7}}>
              <Text style={{flex:1}} testID='fullName' fontWeight="bold" >{item.fullName}</Text>
            </View>
            <View flexDirection="row" style={{marginBottom:7}}>
              <Text style={{flex:1}} testID='description' color="textSecondary" >{item.description}</Text>
            </View>  
            <View flexDirection="row" style={styles.languageContainer}>
              <Text style={{color:'white'}} testID='language' >{item.language}</Text>
            </View>
          </View>
        </View>
        <Counts item={item}/>
        {showButton
        ? <Button
            title="Open in GitHub"
            onPress={openLink}
          />
        : null}
      </View>
    );
  };


export default RepositoryItem;