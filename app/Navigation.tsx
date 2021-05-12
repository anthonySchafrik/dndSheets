import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './areas/Home';
import CharacterScreen from './areas/Character';
import CharactersScreen from './areas/Characters';
import CharacterCreateScreen from './areas/CharacterCreate';
import StatsScreen from './areas/CharacterCreate/screens/Stats';
import SkillsScreen from './areas/CharacterCreate/screens/Skills';
// import theme from './theme';

export type RootStackParamList = {
  Home: undefined;
  Character: undefined;
  Characters: undefined;
  CharacterCreate: undefined;
  CreateStats: undefined;
  CreateSkills: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const defaultScreenOptions = {
  headerTransparent: true,
  // headerStyle: { backgroundColor: theme.background },
  title: '',
};

function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            ...defaultScreenOptions,
            // headerStyle: { backgroundColor: 'black' },
          }}
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
        <RootStack.Screen
          name="CreateStats"
          component={StatsScreen}
          options={defaultScreenOptions}
        />
        <RootStack.Screen
          name="CreateSkills"
          component={SkillsScreen}
          options={defaultScreenOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
