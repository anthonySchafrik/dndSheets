import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { AppDispatch, AppState } from '../../../redux/store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Navigation';
import Attacks from '../components/Attacks';
import SkillRow from '../components/SkillRow';
import StyledButton from '../../../SharedComponents/StyledButton';
import theme from '../../../theme';

type StatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateSkills'
>;

interface Props {
  navigation: StatsScreenNavigationProp;
}

interface SkillRow {
  text: string;
  subText: string;
}

const SkillsScreen = ({ navigation }: Props) => {
  const [rowsToRender, handleRowRender] = useState<number[]>([]);

  const skillRowBuilder = (skills: SkillRow[]) =>
    skills.map((skill, i) => {
      const { text, subText } = skill;
      return <SkillRow text={text} subText={subText} key={i} />;
    });

  const setRowsToRender = () => {
    handleRowRender([...rowsToRender, rowsToRender.length]);
  };

  const attackRowRender = () => rowsToRender.map(x => <Attacks key={x} />);

  const navScreenPush = (screen: keyof RootStackParamList) => () => {
    navigation.push(screen);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.rows}>
            {skillRowBuilder([
              { text: 'Acrobatics', subText: 'Dex' },
              { text: 'Arcana', subText: 'Int' },
              { text: 'Deception', subText: 'Cha' },
              { text: 'Insight', subText: 'Wis' },
              { text: 'Investigation', subText: 'Int' },
              { text: 'Nature', subText: 'Int' },
              { text: 'Performance', subText: 'Cha' },
              { text: 'Religion', subText: 'Int' },
              { text: 'Stealth', subText: 'Dex' },
            ])}
          </View>

          <View style={styles.rows}>
            {skillRowBuilder([
              { text: 'Animal Handling', subText: 'Wis' },
              { text: 'Athletics', subText: 'Str' },
              { text: 'History', subText: 'Int' },
              { text: 'Intimidation', subText: 'Cha' },
              { text: 'Medicine', subText: 'Wis' },
              { text: 'Perception', subText: 'Wis' },
              { text: 'Persuasion', subText: 'Cha' },
              { text: 'Sleight of Hand', subText: 'Dex' },
              { text: 'Survival', subText: 'Wis' },
            ])}
          </View>
        </View>

        <View style={styles.attackContainer}>
          <Text style={{ color: theme.font }}>Attacks & SpellCasting</Text>
          <View style={styles.attSpellContainer}>
            <ScrollView>
              <Grid>
                <Col>
                  <Text style={{ color: theme.font }}>Name</Text>
                </Col>

                <Col>
                  <Text style={{ color: theme.font }}>ATK Bonus</Text>
                </Col>

                <Col>
                  <Text style={{ color: theme.font }}>Damage/Type</Text>
                </Col>
              </Grid>

              {attackRowRender()}
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <View style={styles.styledButton}>
              <Text style={styles.createCharacterText}>Create Character</Text>
            </View>
            <View style={styles.styledButton}>
              <Text onPress={setRowsToRender} style={{ color: theme.font }}>
                Add Attack
              </Text>
            </View>
            <StyledButton
              style={styles.buttonStyles}
              text="Spell List"
              onClick={navScreenPush('CreateSpells')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    width: '100%',
    paddingTop: 25,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
  },
  rows: {
    width: '48%',
  },
  attackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  attSpellContainer: {
    borderColor: theme.primary,
    borderWidth: 1,
    height: 200,
    width: 395,
    marginTop: 8,
    paddingLeft: 15,
  },
  styledButton: {
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonStyles: {
    width: 100,
  },
  createCharacterText: {
    color: theme.font,
    fontSize: 13,
  },
});

const mapStateToProps = (state: AppState) => {
  const { character } = state;
  return { character };
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(SkillsScreen);
