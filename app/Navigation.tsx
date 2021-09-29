import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './areas/Home';
import CharacterScreen from './areas/Character';
import CharactersScreen from './areas/Characters';
import CharacterCreateScreen from './areas/CharacterCreate';
import StatsScreen from './areas/CharacterCreate/screens/Stats';
import SkillsScreen from './areas/CharacterCreate/screens/Skills';
import SpellListScreen from './areas/CharacterCreate/screens/SpellListScreen';
import CharacterStatScreen from './areas/Character/Stats';
import CharacterEquipmentScreen from './areas/Character/Equipment';
import CharacterAttacksScreen from './areas/Character/Attacks';
import CharacterSpellsScreen from './areas/Character/Spells';
import CharacterSkillsScreen from './areas/Character/Skills';
import DiceScreen from './areas/Character/Dice';
import theme from './theme';

export type RootStackParamList = {
  Home: undefined;
  Character: undefined;
  Characters: undefined;
  CharacterCreate: undefined;
  CreateStats: undefined;
  CreateSkills: undefined;
  CreateSpells: undefined;
};

export type DrawerPramList = {
  Character: undefined;
  Stats: undefined;
  Equipment: undefined;
  Attacks: undefined;
  Spells: undefined;
  Skills: undefined;
  Dice: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerPramList>();

const defaultScreenOptions = {
  headerTransparent: true,
  // headerStyle: { backgroundColor: theme.background },
  title: '',
};

const drawerStyle = {
  width: '40%',
  backgroundColor: theme.secondary,
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Character" drawerStyle={drawerStyle}>
      <Drawer.Screen name="Character" component={CharacterScreen} />
      <Drawer.Screen name="Stats" component={CharacterStatScreen} />
      <Drawer.Screen name="Equipment" component={CharacterEquipmentScreen} />
      <Drawer.Screen name="Attacks" component={CharacterAttacksScreen} />
      <Drawer.Screen name="Spells" component={CharacterSpellsScreen} />
      <Drawer.Screen name="Skills" component={CharacterSkillsScreen} />
      <Drawer.Screen name="Dice" component={DiceScreen} />
    </Drawer.Navigator>
  );
}

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
          component={DrawerNavigator}
          options={{
            headerStyle: { backgroundColor: theme.background },
          }}
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
        <RootStack.Screen
          name="CreateSpells"
          component={SpellListScreen}
          options={defaultScreenOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
