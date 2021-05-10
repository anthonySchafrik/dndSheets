import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './areas/Home';
import CharacterScreen from './areas/Character';
import CharactersScreen from './areas/Characters';
import CharacterCreateScreen from './areas/CharacterCreate';

export type RootStackParamList = {
  Home: undefined;
  Character: undefined;
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
          name="Character"
          component={CharacterScreen}
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
