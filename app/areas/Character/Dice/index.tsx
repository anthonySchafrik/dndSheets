import React, { useReducer } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../../theme';

const initialDiceState = {
  d4: NaN,
  d6: NaN,
  d8: NaN,
  d10: NaN,
  percentile: NaN,
  d12: NaN,
  d20: NaN,
};

const rollReducer = (state: any, action: any) => {
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

const Dice = () => {
  const [rolls, rollsDispatch] = useReducer(rollReducer, initialDiceState);

  const diceRoller = (minRoll: number, maxRoll: number, dice: string) => () => {
    const min = Math.ceil(minRoll);
    const max = Math.floor(maxRoll);

    rollsDispatch({
      type: 'update',
      payload: {
        key: dice,
        value: Math.floor(Math.random() * (max - min + 1)) + min,
      },
    });
  };

  const percentileRoll = (min: number, max: number, dice: string) => () => {
    rollsDispatch({
      type: 'update',
      payload: {
        key: dice,
        value: Math.floor(Math.random() * (max - min) + min) * 10,
      },
    });
  };

  console.log(rolls);

  return (
    <View style={styles.screen}>
      <Text>Select Multiplier</Text>
      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={diceRoller(1, 4, 'd4')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/d4.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>{isNaN(rolls.d4) ? null : rolls.d4}</Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={diceRoller(1, 6, 'd6')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/d6.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>{isNaN(rolls.d6) ? null : rolls.d6}</Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={diceRoller(1, 8, 'd8')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/d8.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>{isNaN(rolls.d8) ? null : rolls.d8}</Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={diceRoller(1, 10, 'd10')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/d10.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>
          {isNaN(rolls.d10) ? null : rolls.d10}
        </Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={percentileRoll(1, 10, 'percentile')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/percentile.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>
          {isNaN(rolls.percentile) ? null : rolls.percentile}
        </Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={diceRoller(1, 12, 'd12')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/d12.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>
          {isNaN(rolls.d12) ? null : rolls.d12}
        </Text>
      </View>

      <View style={styles.diceContainer}>
        <TouchableOpacity onPress={diceRoller(1, 20, 'd20')}>
          <Image
            style={styles.img}
            source={require('../../../../assets/dice/d20.png')}
          />
        </TouchableOpacity>
        <Text style={styles.diceText}>
          {isNaN(rolls.d20) ? null : rolls.d20}
        </Text>
      </View>
    </View>
  );
};

export default Dice;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 2,
  },
  img: { height: 75, width: 75 },
  diceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  diceText: {
    alignSelf: 'center',
    paddingVertical: 2,
    color: theme.font,
  },
});
