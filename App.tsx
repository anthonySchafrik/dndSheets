// import React from 'react';
// import {SafeAreaView, StyleSheet, Text} from 'react-native';
// // import {NavigationContainer} from '@react-navigation/native';

// const App = () => {
//   // const character = useSelector((state: AppState) => state.character);

//   return (
//     // <NavigationContainer>
//     <SafeAreaView style={styles.container}>
//       <Text>This is the app</Text>
//     </SafeAreaView>
//     // </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//   },
// });

// export default App;

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function DetailsScreen() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
}

function HomeScreen({navigation}) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
