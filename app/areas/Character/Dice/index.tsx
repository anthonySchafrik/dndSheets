import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../../theme';

const Dice = () => {
  return (
    <View style={styles.screen}>
      <Text>Select Multiplier</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked d4');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/d4.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked d6');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/d6.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked d8');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/d8.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked d10');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/d10.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked percentile');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/percentile.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked d12');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/d12.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log('clicked d20');
        }}>
        <Image
          style={styles.img}
          source={require('../../../../assets/dice/d20.png')}
        />
      </TouchableOpacity>
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
});
