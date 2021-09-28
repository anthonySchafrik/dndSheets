import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { AppState } from '../../../redux/store';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import theme from '../../../theme';

interface Props {
  text: string;
  subText: string;
}

const SkillRow = ({ text, subText }: Props) => {
  const dispatch = useAppDispatch();

  const { skills } = useAppSelector((state: AppState) => state.character);

  const [proficient, handleProficient] = useState(false);
  const [updateMult, handleUpdateMult] = useState('');

  const setProficient = () => handleProficient(!proficient);

  const handleMultUpdate = () => (text: string) => handleUpdateMult(text);

  const handleCharacterUpdate = () => {
    const key = text.toLowerCase();

    dispatch(
      updateCharacter({
        key: 'skills',
        value: {
          ...skills,
          [key]: { mult: updateMult, proficient },
        },
      }),
    );
  };

  useEffect(() => {
    handleCharacterUpdate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proficient]);

  return (
    <View style={styles.container}>
      <Grid style={styles.gridContainer}>
        <Col size={8}>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.circle,
              backgroundColor: proficient ? 'black' : theme.background,
            }}>
            <Text onPress={setProficient} />
          </View>
        </Col>
        <Col size={10}>
          <TextInput
            placeholder="Mult"
            placeholderTextColor={theme.font}
            style={styles.styledTextInput}
            onChangeText={handleMultUpdate()}
            onEndEditing={handleCharacterUpdate}
          />
        </Col>
        <Col size={35} style={styles.rowItem}>
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
    marginVertical: Platform.OS === 'ios' ? 15 : 2,
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
    color: theme.font,
  },
  styledText: {
    fontSize: 12,
    color: theme.font,
  },
  gridContainer: { alignItems: 'center' },
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SkillRow;
