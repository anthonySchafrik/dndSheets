import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { bindActionCreators } from 'redux';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { Equipment, UpdateCharacterPayload } from '../../../redux/reduxType';
import { AppDispatch } from '../../../redux/store';
import theme from '../../../theme';

interface Props {
  updateCharacter: (payload: UpdateCharacterPayload) => AnyAction;
}

interface State extends Equipment {}

class EquipmentComponent extends Component<Props, State> {
  state = { cp: '', sp: '', ep: '', gp: '', pp: '', text: '' };

  stateUpdater = (key: string, value: string) => {
    const lowerCaseKey = key.toLowerCase();

    this.setState({ [lowerCaseKey]: value });
  };

  handleCharacterUpdate = () => {
    const {
      state,
      props: { updateCharacter },
    } = this;

    updateCharacter({ key: 'equipment', value: state });
  };

  buildRowContainer = (texts: string[]) => {
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
            placeholderTextColor={theme.font}
            placeholder="Amount"
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
              placeholderTextColor={theme.font}
              style={styles.styledTextInput}
              placeholder="Other Equipment"
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
    width: '95%',
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
    color: theme.font,
    marginVertical: 3,
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(EquipmentComponent);
