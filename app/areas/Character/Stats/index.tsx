/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  Stats,
  SavingThrows,
  CombatSkills,
  UpdateCharacterPayload,
} from '../../../redux/reduxType';
import { updateCharacter } from '../../../redux/actions/characterActions';
import store, { AppState, AppDispatch } from '../../../redux/store';
import StatOval from './components/StatOval';
import theme from '../../../theme';

interface ActionPayload {
  [key: string]: string | number;
  key: string;
  value: string;
}

interface ReducerAction {
  type: string;
  payload: ActionPayload;
}

interface StatsState {
  stats: Stats;
  savingThrows: SavingThrows;
}

interface Props {
  combatSkills: CombatSkills;
  stats: Stats;
  savingThrows: SavingThrows;
  updateCharacter: (payload: UpdateCharacterPayload) => AnyAction;
}

const combatReducer = (state: CombatSkills, action: ReducerAction) => {
  const { type, payload } = action;
  const { key, value } = payload;

  switch (type) {
    case 'update':
      return {
        ...state,
        [key]: value,
      };

    case 'retrieve':
      return state;

    default:
      throw new Error();
  }
};

const statsReducer = (state: StatsState, action: ReducerAction) => {
  const { type, payload } = action;
  const { key, value } = payload;
  const { stats, savingThrows } = state;

  switch (type) {
    case 'stat':
      return {
        ...state,
        stats: {
          ...stats,
          [key]: {
            ...stats[key],
            stat: value,
          },
        },
      };

    case 'statMult':
      return {
        ...state,
        stats: {
          ...stats,
          [key]: {
            ...stats[key],
            mult: value,
          },
        },
      };

    case 'saving':
      return {
        ...state,
        savingThrows: {
          ...savingThrows,
          [key]: {
            ...savingThrows[key],
            mult: value,
          },
        },
      };

    default:
      throw new Error();
  }
};

const StatsScreen = ({
  combatSkills,
  stats,
  savingThrows,
  updateCharacter,
}: Props) => {
  const [updatedCombatSkills, combatDispatch] = useReducer(
    combatReducer,
    combatSkills,
  );

  const [updateStats, statsDispatch] = useReducer(statsReducer, {
    stats,
    savingThrows,
  });

  const {
    proficiency,
    armorClass,
    initiative,
    speed,
    hp,
    hd,
    level,
    exp,
  } = updatedCombatSkills;

  const {
    stats: updatedStats,
    savingThrows: updatedSavingThrows,
  } = updateStats;

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

  useEffect(() => {
    updateCharacter({ key: 'stats', value: updatedStats });
  }, [updateStats]);

  useEffect(() => {
    updateCharacter({
      key: 'savingThrows',
      value: updatedSavingThrows,
    });
  }, [updatedSavingThrows]);

  const handleUpdateCharacter = (key: string, value: string) => () =>
    updateCharacter({ key, value });

  const handleCombatReducer = (type: string, key: string) => (text: string) => {
    combatDispatch({
      type,
      payload: { key, value: text },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>HP</Text>
            <TextInput
              value={hp}
              onChangeText={handleCombatReducer('update', 'hp')}
              onEndEditing={handleUpdateCharacter('hit points maximum', hp)}
            />
          </View>

          <View style={styles.squContainer}>
            <View style={styles.row}>
              <Text style={styles.textAlineKindOf}>Initiative</Text>
              <TextInput
                value={initiative}
                onChangeText={handleCombatReducer('update', 'initiative')}
                onEndEditing={handleUpdateCharacter('initiative', initiative)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.textAlineKindOf}>Speed</Text>
              <TextInput
                value={speed}
                onChangeText={handleCombatReducer('update', 'speed')}
                onEndEditing={handleUpdateCharacter('speed', speed)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.textAlineKindOf}>Level</Text>
              <TextInput
                value={level}
                onChangeText={handleCombatReducer('update', 'level')}
                onEndEditing={handleUpdateCharacter('level', level)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.textAlineKindOf}>Exp</Text>
              <TextInput
                value={exp}
                onChangeText={handleCombatReducer('update', 'exp')}
                onEndEditing={handleUpdateCharacter('exp', exp)}
              />
            </View>
          </View>

          <View style={styles.midContainer}>
            <View style={styles.centered}>
              <Text style={styles.styledText}>Hit Dice</Text>
              <TextInput
                value={hd}
                style={styles.styledText}
                onChangeText={handleCombatReducer('update', 'hd')}
                onEndEditing={handleUpdateCharacter('hit dice', hd)}
              />
            </View>

            <ImageBackground
              style={styles.imgStyle}
              source={require('../../../../assets/shield.png')}>
              <TextInput
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.styledText,
                  paddingLeft: armorClass.length > 1 ? 5 : 14,
                }}
                value={armorClass}
                onChangeText={handleCombatReducer('update', 'armorClass')}
                onEndEditing={handleUpdateCharacter('armor class', armorClass)}
              />
            </ImageBackground>

            <View style={styles.centered}>
              <Text style={styles.styledText}>Proficiency</Text>
              <TextInput
                value={proficiency}
                style={styles.styledText}
                onChangeText={handleCombatReducer('update', 'proficiency')}
                onEndEditing={handleUpdateCharacter(
                  'proficiency bonus',
                  proficiency,
                )}
              />
            </View>
          </View>

          <View style={styles.statContainer}>
            <View style={styles.row}>
              <StatOval
                stat="strength"
                score={updatedStats.strength.stat}
                multiplier={updatedStats.strength.mult}
                save={updatedSavingThrows.strength.mult}
                statsDispatch={statsDispatch}
              />
              <StatOval
                stat="dexterity"
                score={updatedStats.dexterity.stat}
                multiplier={updatedStats.dexterity.mult}
                save={updatedSavingThrows.dexterity.mult}
                statsDispatch={statsDispatch}
              />
            </View>

            <View style={styles.row}>
              <StatOval
                stat="intelligence"
                score={updatedStats.intelligence.stat}
                multiplier={updatedStats.intelligence.mult}
                save={updatedSavingThrows.intelligence.mult}
                statsDispatch={statsDispatch}
              />
              <StatOval
                stat="charisma"
                score={updatedStats.charisma.stat}
                multiplier={updatedStats.charisma.mult}
                save={updatedSavingThrows.charisma.mult}
                statsDispatch={statsDispatch}
              />
            </View>

            <View style={styles.row}>
              <StatOval
                stat="wisdom"
                score={updatedStats.wisdom.stat}
                multiplier={updatedStats.wisdom.mult}
                save={updatedSavingThrows.wisdom.mult}
                statsDispatch={statsDispatch}
              />
              <StatOval
                stat="constitution"
                score={updatedStats.constitution.stat}
                multiplier={updatedStats.constitution.mult}
                save={updatedSavingThrows.constitution.mult}
                statsDispatch={statsDispatch}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: AppState) => {
  const {
    stats,
    'proficiency bonus': proficiency,
    'armor class': armorClass,
    initiative,
    speed,
    'hit points maximum': hp,
    'hit dice': hd,
    name,
    savingThrows,
    exp,
    level,
  } = state.character;

  return {
    combatSkills: {
      proficiency,
      armorClass,
      initiative,
      speed,
      hp,
      hd,
      name,
      exp,
      level,
    },
    stats,
    savingThrows,
  };
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    alignItems: 'center',
  },
  box: {
    width: 75,
    height: 75,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 5,
    borderRadius: 10,
  },
  squContainer: {
    backgroundColor: theme.primary,
    height: 80,
    width: '95%',
    justifyContent: 'space-around',
    padding: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  midContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    padding: 5,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statContainer: {
    width: '95%',
    height: 340,
    justifyContent: 'space-evenly',
  },
  styledText: {
    color: theme.font,
  },
  imgStyle: {
    width: 70,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAlineKindOf: {
    marginVertical: 13,
  },
});

export default connect(mapStateToProps, mapDispatchToProp)(StatsScreen);
