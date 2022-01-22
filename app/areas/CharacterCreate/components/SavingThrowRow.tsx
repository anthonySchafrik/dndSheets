import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';

import { updateCharacter } from '../../../redux/actions/characterActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { AppState } from '../../../redux/store';
import theme from '../../../theme';

interface Props {
  text: string;
}

const SavingThrowRow = ({ text }: Props) => {
  const dispatch = useAppDispatch();

  const { savingThrows } = useAppSelector((state: AppState) => state.character);

  const [proficient, handleProficient] = useState(false);
  const [updateMult, handleUpdateMult] = useState('');

  const characterUpdater = () => {
    const key = text.toLowerCase();

    dispatch(
      updateCharacter({
        key: 'savingThrows',
        value: {
          ...savingThrows,
          [key]: { mult: updateMult, proficient },
        },
      }),
    );
  };

  useEffect(() => {
    characterUpdater();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proficient]);

  const handleCharacterUpdate = () => {
    characterUpdater();
  };

  const handleProficientUpdate = (boolean: boolean) => () =>
    handleProficient(boolean);

  const handleMultUpdate = () => (text: string) => handleUpdateMult(text);

  return (
    <Grid style={styles.container}>
      <Col size={2}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.checkedCircle,
            backgroundColor: proficient ? 'black' : theme.primary,
          }}>
          <Text
            style={{ color: theme.font }}
            onPress={handleProficientUpdate(!proficient)}
          />
        </View>
      </Col>
      <Col size={2}>
        <TextInput
          placeholder="Mult"
          placeholderTextColor={theme.font}
          style={styles.styledInput}
          onChangeText={handleMultUpdate()}
          onEndEditing={handleCharacterUpdate}
          value={updateMult}
        />
      </Col>
      <Col size={2} style={styles.textCol}>
        <Text style={{ color: theme.font }}>{text}</Text>
      </Col>
    </Grid>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    paddingLeft: 5,
    paddingRight: 15,
  },
  checkedCircle: {
    height: 25,
    width: 25,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 25,
  },
  styledInput: {
    color: theme.font,
  },
  textCol: { alignItems: 'flex-end' },
});

export default SavingThrowRow;
