import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../../Navigation';
import { useAppSelector } from '../../../redux/hooks';
import { AppState } from '../../../redux/store';
import Spell from '../components/Spell';
import theme from '../../../theme';

type StatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateSpells'
>;

interface Props {
  navigation: StatsScreenNavigationProp;
}

const SpellListScreen = ({ navigation }: Props) => {
  const character = useAppSelector((state: AppState) => state.character);

  const [rowsToRender, handleRowRender] = useState<number[]>([]);

  const storeData = async () => {
    const name = character.name;

    try {
      await AsyncStorage.setItem(name, JSON.stringify(character));

      navigation.replace('Characters');
    } catch (error) {
      console.log(error);
    }
  };

  const setRowsToRender = () => {
    handleRowRender([...rowsToRender, rowsToRender.length]);
  };

  const spellRowRender = () => rowsToRender.map(x => <Spell key={x} />);

  return (
    <View style={styles.screen}>
      <View style={styles.spellContainer}>
        <View style={styles.spellInnerContainer}>
          <ScrollView>
            <Spell />
            {spellRowRender()}
          </ScrollView>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.styledButton}>
          <Text onPress={setRowsToRender} style={styles.styledText}>
            Add Spell
          </Text>
        </View>

        <View style={styles.styledButton}>
          <Text onPress={storeData} style={styles.styledText}>
            Create Character
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  styledButton: {
    height: 40,
    width: 120,
    borderRadius: 10,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  spellContainer: {
    height: 540,
    marginVertical: Platform.OS === 'ios' ? 50 : 1,
  },
  styledText: {
    color: 'white',
  },
  spellInnerContainer: { height: 300 },
});

export default SpellListScreen;
