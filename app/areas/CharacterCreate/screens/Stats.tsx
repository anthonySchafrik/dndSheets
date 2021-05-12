import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { AnyAction, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { UpdateCharacterPayload } from '../../../redux/reduxType';
import { RootStackParamList } from '../../../Navigation';
import { AppDispatch, AppState } from '../../../redux/store';
import theme from '../../../theme';
import StatBox from '../components/StatBox';
import StatRectangle from '../components/StatRectangle';
// import SavingThrowRow from '../components/SavingThrowRow';
// import InputBox from '../components/InputBox';
import StyledButton from '../../../SharedComponents/StyledButton';
import SavingThrowRow from '../components/SavingThrowRow';

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

  // buildInputBoxes = boxTexts =>
  //   boxTexts.map((x, i) => {
  //     const { text, style } = x;

  //     return <InputBox text={text} key={i} style={style} />;
  //   });

  navScreenPush = (screen: keyof RootStackParamList) => () => {
    const { navigation } = this.props;

    navigation.push(screen);
  };

  render = () => {
    const {
      // buildStatBoxes,
      // buildSavingThrowRows,
      // buildInputBoxes,
      // navScreenPush,
      // handleStateUpdate,
      // handleCharUpdate,
    } = this;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={80}
        style={styles.screen}>
        <ScrollView>
          <View style={styles.container}>
            <View>
              {this.buildStatBoxes([
                'Strength',
                'Dexterity',
                'Constitution',
                'Intelligence',
                'Wisdom',
                'Charisma',
              ])}
            </View>

            <View>
              <StatRectangle text="Inspiration" outline="box" />
              <StatRectangle text="Proficiency Bonus" outline="circle" />

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
                {/* {buildInputBoxes([
                  { text: 'Armor Class', style: { paddingLeft: 15 } },
                  { text: 'Initiative', style: {} },
                  { text: 'Speed', style: {} },
                ])} */}
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
        </ScrollView>
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
  },
  savingRow: {
    backgroundColor: theme.secondary,
    alignItems: 'center',
  },
  boxRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hitRow: {
    paddingTop: 3,
    backgroundColor: theme.secondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  styledTextInput: {
    borderBottomColor: theme.primary,
    borderBottomWidth: 1,
  },
  styledButton: {
    marginTop: 30,
    backgroundColor: theme.secondary,
  },
  buttonContainer: { paddingLeft: 25 },
});

const mapStateToProps = (state: AppState) => {
  console.log({ state });

  return {};
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(StatScreen);
