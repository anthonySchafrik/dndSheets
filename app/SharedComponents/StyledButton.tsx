import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';

import theme from '../theme';

interface Props {
  text: string;
  style?: any;
  onClick: () => void;
}

const StyledButton = ({ text, style = {}, onClick }: Props) => {
  return (
    <TouchableNativeFeedback onPress={onClick}>
      <View style={[styles.container, style]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 120,
    borderRadius: 10,
  },
  text: {
    color: theme.font,
  },
});

export default StyledButton;
