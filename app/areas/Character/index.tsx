import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { DrawerPramList } from '../../Navigation';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import theme from '../../theme';

type CharacterScreenNavigationProp = DrawerNavigationProp<
  DrawerPramList,
  'Character'
>;

type Props = {
  navigation: CharacterScreenNavigationProp;
};

export default function CharacterScreen({ navigation }: Props) {
  const nav = (text: keyof DrawerPramList) => () => navigation.navigate(text);

  const buildTiles = (texts: string[]) => {
    return texts.map((text: keyof DrawerPramList, i) => {
      return (
        <TouchableNativeFeedback key={i} onPress={nav(text)}>
          <View style={styles.tile}>
            <Text>{text}</Text>
          </View>
        </TouchableNativeFeedback>
      );
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.tilesContainer}>
          <View>{buildTiles(['Stats', 'Attacks'])}</View>
          <View>{buildTiles(['Equipment', 'Spells'])}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: theme.background,
    padding: 10,
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  tilesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tile: {
    backgroundColor: theme.primary,
    height: 100,
    width: 100,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
