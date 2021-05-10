import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import {setSelectCharacter} from '../actions/characters';

// import CharacterList from '../components/CharacterList';
import StyledButton from '../../SharedComponents/StyledButton';
import theme from '../../theme';

class CharactersScreen extends Component {
  componentDidMount = () => {
    console.log('CharactersScreen mounted');
    // const { fetchCharactersData } = this;

    // fetchCharactersData();
  };

  // navScreenPush = screen => {
  //   const {navigation} = this.props;

  //   navigation.push(screen);
  // };

  // fetchCharactersData = async () => {
  //   const {fetchCharacters} = this.props;
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     if (keys !== null) {
  //       fetchCharacters(keys);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  render = () => {
    // const {navScreenPush, fetchCharactersData} = this;
    // const {characters} = this.props;

    return (
      <View style={styles.screen}>
        <Image source={require('../../../assets/sword-dice.png')} />

        <View style={styles.listContainer}>
          {/* <CharacterList
            fetchCharactersData={fetchCharactersData}
            navScreenPush={navScreenPush}
            chars={characters}
          /> */}
        </View>

        <View>
          <StyledButton onClick={() => {}} text="Create Character" />
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

const mapStateToProps = state => {
  // const { selectedCharacter, characters } = state.character;
  return {
    // selectedCharacter,
    // characters
  };
};

const mapDispatchToProp = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(CharactersScreen);
