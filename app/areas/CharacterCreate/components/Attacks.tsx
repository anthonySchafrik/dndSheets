import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators } from 'redux';

import { updateCharacter } from '../../../redux/actions/characterActions';
import {
  CharacterAttacks,
  UpdateCharacterPayload,
} from '../../../redux/reduxType';
import { AppDispatch, AppState } from '../../../redux/store';
import theme from '../../../theme';

interface State {
  [key: string]: string;
  name: string;
  bonus: string;
  damage: string;
}

interface Props {
  rowItem?: CharacterAttacks;
  attacks: CharacterAttacks[];
  updateCharacter: (payload: UpdateCharacterPayload) => AnyAction;
}

class Attacks extends Component<Props, State> {
  state = {
    name: '',
    bonus: '',
    damage: '',
  };

  componentDidMount = () => {
    if (this.props.rowItem) {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState(this.props.rowItem);
    }
  };

  stateUpdater = (key: keyof State) => (value: string) =>
    this.setState({ [key]: value });

  handleCharacterUpdate = () => {
    const { attacks, updateCharacter } = this.props;
    const { name, bonus, damage } = this.state;

    if (name !== '' && bonus !== '' && damage !== '') {
      updateCharacter({
        key: 'attacks',
        value: [...attacks, { name, bonus, damage }],
      });
    }
    return;
  };

  render = () => {
    const { stateUpdater, handleCharacterUpdate } = this;
    const { name, bonus, damage } = this.state;

    return (
      <Grid style={styles.screen}>
        <Col>
          <View style={styles.colContainer}>
            <TextInput
              onChangeText={stateUpdater('name')}
              placeholder="Attack Name"
              placeholderTextColor={theme.font}
              onEndEditing={handleCharacterUpdate}
              value={name}
              style={styles.styledInput}
            />
          </View>
        </Col>

        <Col>
          <View style={styles.colContainer}>
            <TextInput
              style={styles.styledInput}
              onChangeText={stateUpdater('bonus')}
              placeholder="Bonus"
              placeholderTextColor={theme.font}
              onEndEditing={handleCharacterUpdate}
              value={bonus}
            />
          </View>
        </Col>

        <Col>
          <View style={styles.colContainer}>
            <TextInput
              style={styles.styledInput}
              onChangeText={stateUpdater('damage')}
              placeholder="Damage"
              placeholderTextColor={theme.font}
              onEndEditing={handleCharacterUpdate}
              value={damage}
            />
          </View>
        </Col>
      </Grid>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  colContainer: {
    borderBottomWidth: 1,
    width: '90%',
    borderColor: theme.primary,
  },
  styledInput: {
    color: theme.font,
  },
});

const mapStateToProps = (state: AppState) => {
  const { attacks } = state.character;
  return { attacks };
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(Attacks);
