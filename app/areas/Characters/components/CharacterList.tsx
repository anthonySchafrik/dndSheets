import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnyAction } from 'redux';

import { useAppDispatch } from '../../../redux/hooks';
import theme from '../../../theme';

interface Props {
  chars?: string[];
  navScreenPush: () => void;
  setSavedCharacters: (payload: string[]) => AnyAction;
}

const CharacterList = ({
  chars = [],
  navScreenPush,
  setSavedCharacters,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleSelectCharacter = (char: string) => async () => {
    try {
      console.log('handleSelectCharacter => ', { char });
      // const value = await AsyncStorage.getItem(char);
      // if (value !== null) {
      //   setSelectCharacter(JSON.parse(value));

      navScreenPush();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCharacter = async (char: string) => {
    try {
      // await AsyncStorage.removeItem(char);

      dispatch(setSavedCharacters(chars.filter(x => x !== char)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCharacter = (char: string) => () => {
    Alert.alert(
      'Delete Character',
      'This cannot be undone',
      [{ text: 'No' }, { text: 'Yes', onPress: () => deleteCharacter(char) }],
      {
        cancelable: false,
      },
    );
  };

  const renderCharacterList = () => {
    return chars.map((char, i) => {
      return (
        <View style={styles.list} key={i}>
          <View style={styles.innerContainer}>
            <Text
              style={{ color: theme.font }}
              onPress={handleSelectCharacter(char)}>
              {char}
            </Text>
          </View>
          <Icon
            name="delete"
            size={20}
            color="black"
            onPress={handleDeleteCharacter(char)}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>{renderCharacterList()}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  container: { width: 300 },
  innerContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CharacterList;
