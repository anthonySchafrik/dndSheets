import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';
import { RootStackParamList } from '../../Navigation';

import { setSavedCharacters } from '../../redux/actions/characterActions';
import { AppDispatch, AppState } from '../../redux/store';

import StyledButton from '../../SharedComponents/StyledButton';
import theme from '../../theme';
import CharacterList from './components/CharacterList';

type CharactersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Characters'
>;

type Props = {
  navigation: CharactersScreenNavigationProp;
  setSavedCharacters: (payload: string[]) => AnyAction;
  characterList: string[];
};

interface State {}

class CharactersScreen extends Component<Props, State> {
  componentDidMount = () => {
    const { getSavedCharacters } = this;
    getSavedCharacters();
  };

  navScreenPush = (screen: keyof RootStackParamList) => () => {
    const { navigation } = this.props;

    navigation.push(screen);
  };

  getSavedCharacters = async () => {
    const { setSavedCharacters } = this.props;
    try {
      // const keys = await AsyncStorage.getAllKeys();
      // if (keys !== null) {
      setSavedCharacters(['name1', 'name2']);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  render = () => {
    const {
      props: { characterList, setSavedCharacters },
    } = this;

    return (
      <View style={styles.screen}>
        <Image source={require('../../../assets/sword-dice.png')} />
        <View style={styles.listContainer}>
          <CharacterList
            chars={characterList}
            navScreenPush={this.navScreenPush('Character')}
            setSavedCharacters={setSavedCharacters}
          />
        </View>
        <View>
          <StyledButton
            onClick={this.navScreenPush('CharacterCreate')}
            text="Create Character"
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  listContainer: {
    height: 170,
    justifyContent: 'center',
  },
});

const mapStateToProps = (state: AppState) => {
  const { characterList } = state;
  return {
    characterList,
  };
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ setSavedCharacters }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(CharactersScreen);
