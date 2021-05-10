import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './areas/Home';
import CharactersScreen from './areas/CharactersScreen';

export type RootStackParamList = {
  Home: undefined;
  Characters: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const defaultScreenOptions = {
  headerTransparent: true,
  title: '',
};

function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="Characters"
          component={CharactersScreen}
          options={defaultScreenOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
