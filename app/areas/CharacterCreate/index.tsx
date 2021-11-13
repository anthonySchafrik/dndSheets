import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { RootStackParamList } from '../../Navigation';
import InputComponent from '../../SharedComponents/InputComponent';
import StyledButton from '../../SharedComponents/StyledButton';
import theme from '../../theme';
import EquipmentComponent from './components/EquipmentComponent';

type CharactersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CharacterCreate'
>;

type Props = {
  navigation: CharactersScreenNavigationProp;
};

export default function CharacterCreateScreen({ navigation }: Props) {
  const navScreenPush = (screen: keyof RootStackParamList) => () => {
    navigation.push(screen);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}>
      <View style={styles.inputContainer}>
        <InputComponent text="Name" />
        <InputComponent text="Class" />
      </View>
      <EquipmentComponent />
      <View style={styles.buttonContainer}>
        <StyledButton
          onClick={navScreenPush('CreateStats')}
          text="Character Stats"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: Platform.OS === 'ios' ? '25%' : '5%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },

  buttonContainer: {
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 75 : 25,
  },
});
