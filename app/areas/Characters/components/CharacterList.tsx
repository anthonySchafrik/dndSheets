import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
// import {Ionicons} from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import {setSelectCharacter} from '../actions/characters';

import theme from '../../../theme';

interface Props {
  chars?: string[];
  navScreenPush: () => void;
}

const CharacterList = ({
  chars = [],
  // setSelectCharacter,
  navScreenPush,
}: // fetchCharactersData,
Props) => {
  const handleSelectCharacter = (char: string) => async () => {
    try {
      console.log('handleSelectCharacter => ', {char});
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
      console.log('deleteCharacter => ', {char});
      // await AsyncStorage.removeItem(char);

      // fetchCharactersData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCharacter = (char: string) => () => {
    Alert.alert(
      'Delete Character',
      'This cannot be undone',
      [{text: 'No'}, {text: 'Yes', onPress: () => deleteCharacter(char)}],
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
              style={{color: theme.font}}
              onPress={handleSelectCharacter(char)}>
              {char}
            </Text>
          </View>

          {/* <Ionicons
            name="md-close-circle-outline"
            size={24}
            color="black"
            onPress={handleDeleteCharacter(char)}
          /> */}
        </View>
      );
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={{width: 300}}>{renderCharacterList()}</ScrollView>
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
    marginVertical: 5,
  },
  innerContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProp = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(CharacterList);
