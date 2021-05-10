import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Navigation';
import StyledButton from '../../SharedComponents/StyledButton';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>5th Edition</Text>
      <Image source={require('../../../assets/logo.png')} resizeMode="cover" />

      <StyledButton
        text="To Characters"
        onClick={() => {
          navigation.push('Characters');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: '#B6B6B6',
    fontSize: 30,
  },
});

export default HomeScreen;
