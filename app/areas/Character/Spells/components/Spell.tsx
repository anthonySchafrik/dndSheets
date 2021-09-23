import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';

import { updateCharacter } from '../../../../redux/actions/characterActions';
import {
  CharacterSpells,
  UpdateCharacterPayload,
} from '../../../../redux/reduxType';
import { AppDispatch, AppState } from '../../../../redux/store';
import theme from '../../../../theme';

interface Props {
  spells: CharacterSpells[];
  updateCharacter: (payload: UpdateCharacterPayload) => AnyAction;
  rowItem: CharacterSpells;
}

interface State {
  [key: string]: string;
  spellClass: string;
  ability: string;
  save: string;
  bonus: string;
  description: string;
}

class Spell extends Component<Props, State> {
  state = {
    spellClass: this.props.rowItem.spellClass,
    ability: this.props.rowItem.ability,
    save: this.props.rowItem.save,
    bonus: this.props.rowItem.bonus,
    description: this.props.rowItem.description,
  };

  stateUpdater = (key: keyof State, value: string) =>
    this.setState({ [key]: value });

  handleCharacterUpdate = () => {
    const { spells, updateCharacter } = this.props;
    const { spellClass, ability, save, bonus, description } = this.state;

    if (
      spellClass !== '' &&
      bonus !== '' &&
      ability !== '' &&
      description !== '' &&
      save !== ''
    ) {
      updateCharacter({
        key: 'spells',
        value: [...spells, { spellClass, ability, save, bonus, description }],
      });
    }
    return;
  };

  render = () => {
    const { stateUpdater, handleCharacterUpdate } = this;
    const { spellClass, ability, save, bonus, description } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View>
            <Text style={{ color: theme.font }}>Spellcasting class</Text>
            <TextInput
              style={styles.styledInput}
              onChangeText={text => stateUpdater('spellClass', text)}
              onEndEditing={handleCharacterUpdate}
              value={spellClass}
            />
          </View>
          <View>
            <Text style={{ color: theme.font }}>Spellcasting Ability</Text>
            <TextInput
              style={styles.styledInput}
              onChangeText={text => stateUpdater('ability', text)}
              onEndEditing={handleCharacterUpdate}
              value={ability}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View>
            <Text style={{ color: theme.font }}>Spell Save DC</Text>
            <TextInput
              style={styles.styledInput}
              onChangeText={text => stateUpdater('save', text)}
              onEndEditing={handleCharacterUpdate}
              value={save}
            />
          </View>
          <View>
            <Text style={{ color: theme.font }}>Spell Attack Bonus</Text>
            <TextInput
              style={styles.styledInput}
              onChangeText={text => stateUpdater('bonus', text)}
              onEndEditing={handleCharacterUpdate}
              value={bonus}
            />
          </View>
        </View>

        <View style={styles.spellDescription}>
          <Text style={{ color: theme.font }}>Spell Description</Text>
          <TextInput
            style={styles.styledInput}
            multiline={true}
            onChangeText={text => stateUpdater('description', text)}
            onEndEditing={handleCharacterUpdate}
            value={description}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  styledInput: {
    borderColor: theme.primary,
    borderBottomWidth: 1,
    color: theme.font,
  },
  spellDescription: {
    width: '85%',
    paddingLeft: '10%',
    marginVertical: 8,
  },
});

const mapStateToProps = (state: AppState) => {
  const { spells } = state.character;
  return { spells };
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(Spell);
