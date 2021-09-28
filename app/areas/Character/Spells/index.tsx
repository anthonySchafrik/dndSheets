import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, ScrollView } from 'react-native';

import { useAppSelector } from '../../../redux/hooks';
import store, { AppState } from '../../../redux/store';
import Spell from './components/Spell';
import theme from '../../../theme';
import { useFocusEffect } from '@react-navigation/native';
import StyledButton from '../../../SharedComponents/StyledButton';
import errorHandler from '../../../utils/errorHandler';

const SpellListScreen = () => {
  const character = useAppSelector((state: AppState) => state.character);
  const { spells } = character;

  const [rowsToRender, handleRowRender] = useState([...spells]);

  useFocusEffect(
    React.useCallback(() => {
      const saveUpdateStat = async () => {
        const { character } = store.getState();

        if (!character.name) {
          return;
        }

        try {
          await AsyncStorage.mergeItem(
            character.name,
            JSON.stringify(character),
          );
        } catch (error) {
          errorHandler(error);
        }
      };

      return () => {
        saveUpdateStat();
      };
    }, []),
  );

  const setRowsToRender = () => {
    handleRowRender([
      ...rowsToRender,
      { spellClass: '', ability: '', save: '', bonus: '', description: '' },
    ]);
  };

  const spellRowRender = () =>
    rowsToRender.map((x, i) => <Spell key={i} rowItem={x} />);

  return (
    <View style={styles.screen}>
      <View style={styles.spellContainer}>
        <View style={styles.spellInnerContainer}>
          <ScrollView>{spellRowRender()}</ScrollView>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton text="Add Spell" onClick={setRowsToRender} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
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
  },
  spellInnerContainer: {
    // height: 300
  },
});

export default SpellListScreen;
