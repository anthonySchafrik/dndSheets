import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch, AppState } from '../../../redux/store';

import { updateCharacter } from '../../../redux/actions/characterActions';
import theme from '../../../theme';

const SkillRow = ({ text, updateCharacter, subText, skills }) => {
  const [proficient, handleProficient] = useState(false);
  const [updateMult, handleUpdateMult] = useState('');

  const setProficient = () => handleProficient(!proficient);

  const handleCharacterUpdate = () => {
    const key = text.toLowerCase();

    updateCharacter({
      text: 'skills',
      update: {
        ...skills,
        [key]: { mult: updateMult, proficient },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Grid style={{ alignItems: 'center' }}>
        <Col size={8}>
          <View
            style={{
              ...styles.circle,
              backgroundColor: proficient ? 'black' : null,
            }}>
            <Text onPress={setProficient} />
          </View>
        </Col>
        <Col size={10}>
          <TextInput
            placeholder="Mult"
            placeholderTextColor={theme.font}
            style={styles.styledTextInput}
            onChangeText={text => handleUpdateMult(text)}
            onEndEditing={handleCharacterUpdate}
          />
        </Col>
        <Col
          size={35}
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.styledText}>{text}</Text>
        </Col>
        <Col size={13}>
          <Text style={styles.styledText}>({subText})</Text>
        </Col>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 2,
    alignItems: 'center',
  },
  circle: {
    height: 15,
    width: 15,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 25,
  },
  styledTextInput: {
    // borderBottomColor: theme.primary,
    // borderBottomWidth: 1,
    color: theme.font,
  },
  styledText: {
    fontSize: 12,
    color: theme.font,
  },
});

const mapStateToProps = (state: AppState) => {
  const { skills } = state.character;
  return { skills };
};

const mapDispatchToProp = (dispatch: AppDispatch) => {
  return bindActionCreators({ updateCharacter }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProp)(SkillRow);
