/* eslint-disable react-native/no-inline-styles */
import React, { useState, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import store, { AppState } from '../../../redux/store';
// import { Equipment } from '../../../redux/reduxType';
import theme from '../../../theme';

interface ReducerAction {
  type: string;
  payload: {
    key: string;
    value: string;
  };
}

const equipmentReducer = (state: any, action: ReducerAction) => {
  const { type, payload } = action;
  const { key, value } = payload;

  switch (type) {
    case 'update':
      return {
        ...state,
        [key]: value,
      };

    default:
      throw new Error();
  }
};

const EquipmentScreen = () => {
  const dispatch = useAppDispatch();

  const { treasure, equipment } = useAppSelector(
    (state: AppState) => state.character,
  );

  const [updatedTreasure, handleUpdatedTreasure] = useState(treasure);
  const [updatedEquipment, equipmentDispatch] = useReducer(
    equipmentReducer,
    equipment,
  );

  const { cp, sp, ep, gp, pp, text } = updatedEquipment;

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

  const handleUpdateCharacter = (key: string, value: string) => () =>
    dispatch(updateCharacter({ key, value }));

  const updatedTreasureHandler = () => (text: string) =>
    handleUpdatedTreasure(text);

  const handleEquipmentReducer = (type: string, key: string) => (
    text: string,
  ) => {
    equipmentDispatch({
      type,
      payload: { key, value: text },
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topContainer}>
        <Text style={styles.styledText}>Treasure</Text>
        <ScrollView style={{ width: '100%' }}>
          <TextInput
            multiline={true}
            style={styles.styledTextField}
            value={updatedTreasure}
            onChangeText={updatedTreasureHandler()}
            onEndEditing={handleUpdateCharacter('treasure', updatedTreasure)}
          />
        </ScrollView>
      </View>

      <ScrollView style={{ width: '100%' }}>
        <View
          style={{
            ...styles.row,
            ...styles.rowContainer,
          }}>
          <View>
            <View style={styles.row}>
              <Text>Cp</Text>
              <TextInput
                onChangeText={handleEquipmentReducer('update', 'cp')}
                onEndEditing={handleUpdateCharacter(
                  'equipment',
                  updatedEquipment,
                )}
                value={cp}
                style={styles.rowInput}
              />
            </View>

            <View style={styles.row}>
              <Text>Sp</Text>
              <TextInput
                onChangeText={handleEquipmentReducer('update', 'sp')}
                onEndEditing={handleUpdateCharacter(
                  'equipment',
                  updatedEquipment,
                )}
                value={sp}
                style={styles.rowInput}
              />
            </View>

            <View style={styles.row}>
              <Text>Ep</Text>
              <TextInput
                onChangeText={handleEquipmentReducer('update', 'ep')}
                onEndEditing={handleUpdateCharacter(
                  'equipment',
                  updatedEquipment,
                )}
                value={ep}
                style={styles.rowInput}
              />
            </View>

            <View style={styles.row}>
              <Text>Gp</Text>
              <TextInput
                onChangeText={handleEquipmentReducer('update', 'gp')}
                onEndEditing={handleUpdateCharacter(
                  'equipment',
                  updatedEquipment,
                )}
                value={gp}
                style={styles.rowInput}
              />
            </View>

            <View style={styles.row}>
              <Text>Pp</Text>
              <TextInput
                onChangeText={handleEquipmentReducer('update', 'pp')}
                onEndEditing={handleUpdateCharacter(
                  'equipment',
                  updatedEquipment,
                )}
                value={pp}
                style={styles.rowInput}
              />
            </View>
          </View>
          <TextInput
            value={text}
            multiline={true}
            onChangeText={handleEquipmentReducer('update', 'text')}
            onEndEditing={handleUpdateCharacter('equipment', updatedEquipment)}
            style={styles.equipmentTextField}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 30,
    alignItems: 'center',
  },
  topContainer: {
    width: '95%',
    height: 200,
    alignItems: 'center',
    marginBottom: 30,
  },
  styledText: {
    color: theme.font,
    marginVertical: 5,
  },
  styledTextField: {
    color: theme.font,
    borderWidth: 1,
    borderColor: theme.secondary,
    padding: 5,
    width: '95%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowInput: {
    color: theme.font,
    borderBottomWidth: 1,
    borderBottomColor: theme.secondary,
    paddingLeft: 5,
  },
  rowContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    borderColor: theme.secondary,
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
  },
  equipmentTextField: {
    color: theme.font,
    borderBottomWidth: 1,
    borderBottomColor: theme.secondary,
    width: '60%',
  },
});

export default EquipmentScreen;
