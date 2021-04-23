import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const App = () => {
  // const character = useSelector((state: AppState) => state.character);

  return (
    <SafeAreaView style={styles.container}>
      <Text>This is the app</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});

export default App;
