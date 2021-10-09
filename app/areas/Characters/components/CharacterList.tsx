import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppDispatch } from '../../../redux/hooks';
import { CharacterState } from '../../../redux/reduxType';
import theme from '../../../theme';
import errorHandler from '../../../utils/errorHandler';

interface Props {
  chars?: string[];
  navScreenPush: () => void;
  setSavedCharacters: (payload: string[]) => AnyAction;
  setSelectedCharacter: (payload: CharacterState) => AnyAction;
}

const CharacterList = ({
  chars = [],
  navScreenPush,
  setSavedCharacters,
  setSelectedCharacter,
}: Props) => {
  const dispatch = useAppDispatch();

  const handleSelectCharacter = (char: string) => async () => {
    try {
      const value = await AsyncStorage.getItem(char);

      if (value !== null) {
        dispatch(setSelectedCharacter(JSON.parse(value)));

        navScreenPush();
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const deleteCharacter = async (char: string) => {
    try {
      await AsyncStorage.removeItem(char);

      dispatch(setSavedCharacters(chars.filter(x => x !== char)));
    } catch (error) {
      errorHandler(error);
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

  const renderCharacterList = ({ item }: { item: string }) => {
    return (
      <View style={styles.list}>
        <View style={styles.innerContainer}>
          <Text
            style={{ color: theme.font }}
            onPress={handleSelectCharacter(item)}>
            {item}
          </Text>
        </View>
        <Icon
          name="delete"
          size={20}
          color="black"
          onPress={handleDeleteCharacter(item)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={chars}
        renderItem={renderCharacterList}
        keyExtractor={char => char}
      />
    </SafeAreaView>
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
  innerContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CharacterList;
