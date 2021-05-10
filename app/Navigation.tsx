import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './areas/Home';
import CharactersScreen from './areas/CharactersScreen';
import CharacterCreateScreen from './areas/CharacterCreateScreen';

export type RootStackParamList = {
  Home: undefined;
  Characters: undefined;
  CharacterCreate: undefined;
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
        <RootStack.Screen
          name="CharacterCreate"
          component={CharacterCreateScreen}
          options={defaultScreenOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
