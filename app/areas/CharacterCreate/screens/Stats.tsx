import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
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
const statsToMap = [
  'Strength',
  'Dexterity',
  'Constitution',
  'Intelligence',
  'Wisdom',
  'Charisma',
];

class StatScreen extends Component<Props, State> {
  state = { 'hit points maximum': '', 'hit dice': '' };

  handleStateUpdate = (key: StateUpdate) => (value: string) => {
    this.setState({ [key]: value });
  };

  handleCharUpdate = (key: StateUpdate) => () => {
    const { updateCharacter } = this.props;
    const { state } = this;

    const value = state[key];
    updateCharacter({ key, value });
  };

  buildInputBoxes = (boxTexts: InputBoxes[]) =>
    boxTexts.map(x => {
      const { text, style } = x;

      return <InputBox text={text} key={text} style={style} />;
    });

  navScreenPush = (screen: keyof RootStackParamList) => () => {
    const { navigation } = this.props;

    navigation.push(screen);
  };

  render = () => {
    return (
      <View style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.container}>
            <View style={styles.statBoxes}>
              {statsToMap.map(stat => (
                <StatBox key={stat} stat={stat} />
              ))}
            </View>
            <View>
              <StatRectangle text="Inspiration" />
              <StatRectangle text="Proficiency Bonus" />
              <Text style={styles.savingThrowText}>Saving Throws</Text>
              <View style={styles.savingRow}>
                {statsToMap.map(stat => (
                  <SavingThrowRow key={stat} text={stat} />
                ))}
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
                    onChangeText={this.handleStateUpdate('hit points maximum')}
                    onEndEditing={this.handleCharUpdate('hit points maximum')}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={{ color: theme.font }}>Hit Dice</Text>
                  <TextInput
                    style={styles.styledTextInput}
                    placeholder="Mult"
                    onChangeText={this.handleStateUpdate('hit dice')}
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
      </View>
    );
  };
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: height <= 845 ? 32 : 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: height <= 692 ? '2%' : '12%',
  },
  statBoxes: { height: 600 },
  savingRow: {
    height: 290,
    backgroundColor: theme.secondary,
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
  styledTextInput: { height: 35 },
  styledButton: {
    marginTop: 15,
    backgroundColor: theme.secondary,
  },
  savingThrowText: {
    color: theme.font,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(StatScreen);
