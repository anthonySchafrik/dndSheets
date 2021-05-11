import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../Navigation';
import StyledButton from '../../SharedComponents/StyledButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const navScreenPush = (screen: keyof RootStackParamList) => () => {
    navigation.push(screen);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>5th Edition</Text>
      <Image source={require('../../../assets/logo.png')} resizeMode="cover" />
      <StyledButton
        text="To Characters"
        onClick={navScreenPush('Characters')}
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
