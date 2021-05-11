import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { updateCreateCharacter } from '../actions/characters';
import theme from '../../../theme';

class EquipmentComponent extends Component {
  state = { cp: '', sp: '', ep: '', gp: '', pp: '', text: '' };

  stateUpdater = (key, value) => {
    const lowerCaseKey = key.toLowerCase();

    this.setState({ [lowerCaseKey]: value });
  };

  handleCharacterUpdate = () => {
    const { state } = this;
    // const { updateCreateCharacter } = this.props;

    console.log({ text: 'equipment', update: state }); //updateCreateCharacter
  };

  buildRowContainer = texts => {
    const { stateUpdater, handleCharacterUpdate } = this;

    return texts.map((x, i) => {
      return (
        <View key={i} style={styles.row}>
          <Text style={{ color: theme.font }}>{x}</Text>
          <TextInput
            style={styles.styledTextInput}
            multiline={true}
            onChangeText={text => stateUpdater(x, text)}
            onEndEditing={handleCharacterUpdate}
            keyboardType="numeric"
          />
        </View>
      );
    });
  };

  render = () => {
    const { buildRowContainer, stateUpdater, handleCharacterUpdate } = this;

    return (
      <View style={styles.screen}>
        <View>
          <Text style={{ color: theme.font }}>Equipment</Text>
        </View>
        <View style={styles.container}>
          {/* left column */}
          <View style={styles.rowContainer}>
            {buildRowContainer(['CP', 'SP', 'EP', 'GP', 'PP'])}
          </View>

          {/* Right column */}
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={t => stateUpdater('text', t)}
              style={styles.styledTextInput}
              multiline={true}
              onEndEditing={handleCharacterUpdate}
            />
          </View>
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '85%',
    marginVertical: 30,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    borderColor: theme.primary,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowContainer: {
    paddingBottom: 5,
    paddingLeft: 5,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 60,
  },
  inputContainer: {
    width: '75%',
  },
  styledTextInput: {
    borderColor: theme.primary,
    borderBottomWidth: 1,
    color: theme.font,
  },
});

const mapStateToProps = state => {
  // const { selectedCharacter } = state.character;
  return {
    // selectedCharacter,
  };
};

const mapDispatchToProp = dispatch => {
  return bindActionCreators({}, dispatch); //updateCreateCharacter
};

export default connect(mapStateToProps, mapDispatchToProp)(EquipmentComponent);
