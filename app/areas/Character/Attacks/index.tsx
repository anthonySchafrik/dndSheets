import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';

import store, { AppState } from '../../../redux/store';
import { useAppSelector } from '../../../redux/hooks';
import Attacks from '../../../areas/CharacterCreate/components/Attacks';
import theme from '../../../theme';
import StyledButton from '../../../SharedComponents/StyledButton';
import { useFocusEffect } from '@react-navigation/native';

const SelectedAttacks = () => {
  const character = useAppSelector((state: AppState) => state.character);
  const { attacks } = character;

  const [rowsToRender, handleRowRender] = useState([...attacks]);

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
          console.log(error);
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
      {
        name: '',
        bonus: '',
        damage: '',
      },
    ]);
  };

  const attackRowRender = () =>
    rowsToRender.map((x, i) => <Attacks key={i} rowItem={x} />);

  return (
    <View style={styles.screen}>
      <View style={styles.attSpellContainer}>
        <ScrollView>
          <Grid>
            <Col>
              <Text style={{ color: theme.font }}>Name</Text>
            </Col>

            <Col>
              <Text style={{ color: theme.font }}>ATK Bonus</Text>
            </Col>

            <Col>
              <Text style={{ color: theme.font }}>Damage/Type</Text>
            </Col>
          </Grid>

          {attackRowRender()}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <StyledButton text="Add Attack" onClick={setRowsToRender} />
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  attSpellContainer: {
    alignSelf: 'center',
    borderColor: theme.primary,
    borderWidth: 1,
    height: 400,
    width: 395,
    marginTop: 8,
    padding: 5,
  },
});

export default SelectedAttacks;
