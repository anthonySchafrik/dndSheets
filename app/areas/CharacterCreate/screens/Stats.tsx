import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { UpdateCharacterPayload } from '../../../redux/reduxType';
import { RootStackParamList } from '../../../Navigation';
import { AppDispatch } from '../../../redux/store';
import theme from '../../../theme';
import StatBox from '../components/StatBox';
import StatRectangle from '../components/StatRectangle';
import StyledButton from '../../../SharedComponents/StyledButton';
import SavingThrowRow from '../components/SavingThrowRow';
import InputBox from '../components/InputBox';

type StatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateStats'
>;

interface Props {
  navigation: StatsScreenNavigationProp;
  updateCharacter: (payload: UpdateCharacterPayload) => AnyAction;
}

interface State {
  [key: string]: string;
  'hit points maximum': string;
  'hit dice': string;
}

interface InputBoxes {
  text: string;
  style: object;
}

type StateUpdate = 'hit points maximum' | 'hit dice';

class StatScreen extends Component<Props, State> {
  state = { 'hit points maximum': '', 'hit dice': '' };

  handleStateUpdate = (key: StateUpdate, value: string) => {
    this.setState({ [key]: value });
  };

  handleCharUpdate = (key: StateUpdate) => () => {
    const { updateCharacter } = this.props;
    const { state } = this;

    const value = state[key];
    updateCharacter({ key, value });
  };

  buildStatBoxes = (statTexts: string[]) =>
    statTexts.map((stat, i) => <StatBox key={i} stat={stat} />);

  buildSavingThrowRows = (throwsText: string[]) =>
    throwsText.map((text, i) => <SavingThrowRow key={i} text={text} />);

  buildInputBoxes = (boxTexts: InputBoxes[]) =>
    boxTexts.map((x, i) => {
      const { text, style } = x;

      return <InputBox text={text} key={i} style={style} />;
    });

  navScreenPush = (screen: keyof RootStackParamList) => () => {
    const { navigation } = this.props;

    navigation.push(screen);
  };

  render = () => {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.statBoxes}>
            {this.buildStatBoxes([
              'Strength',
              'Dexterity',
              'Constitution',
              'Intelligence',
              'Wisdom',
              'Charisma',
            ])}
          </View>

          <View style={styles.rightContainer}>
            <StatRectangle text="Inspiration" />
            <StatRectangle text="Proficiency Bonus" />

            <View style={styles.savingRow}>
              {this.buildSavingThrowRows([
                'Strength',
                'Dexterity',
                'Constitution',
                'Intelligence',
                'Wisdom',
                'Charisma',
              ])}
              <Text style={{ color: theme.font }}>Saving Throws</Text>
            </View>

            <View style={styles.boxRows}>
              {this.buildInputBoxes([
                { text: 'Armor Class', style: { paddingLeft: 15 } },
                { text: 'Initiative', style: {} },
                { text: 'Speed', style: {} },
              ])}
            </View>

            <View style={styles.hitRow}>
              <View style={styles.row}>
                <Text style={{ color: theme.font }}>Hit Points Maximum</Text>
                <TextInput
                  style={styles.styledTextInput}
                  placeholder="Mult"
                  onChangeText={text =>
                    this.handleStateUpdate('hit points maximum', text)
                  }
                  onEndEditing={this.handleCharUpdate('hit points maximum')}
                />
              </View>
              <View style={styles.row}>
                <Text style={{ color: theme.font }}>Hit Dice</Text>
                <TextInput
                  style={styles.styledTextInput}
                  placeholder="Mult"
                  onChangeText={text =>
                    this.handleStateUpdate('hit dice', text)
                  }
                  onEndEditing={this.handleCharUpdate('hit dice')}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <StyledButton
                style={styles.styledButton}
                onClick={this.navScreenPush('CreateSkills')}
                text="Skills"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: '12%',
  },
  statBoxes: { height: 600, paddingTop: 35 },
  savingRow: {
    height: 290,
    backgroundColor: theme.secondary,
    alignItems: 'center',
  },
  boxRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hitRow: {
    paddingTop: 1,
    backgroundColor: theme.secondary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  styledTextInput: {},
  styledButton: {
    marginTop: 15,
    backgroundColor: theme.secondary,
  },
  buttonContainer: { paddingLeft: 25 },
  rightContainer: { paddingTop: 15 },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(StatScreen);
