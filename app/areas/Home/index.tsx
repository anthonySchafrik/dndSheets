import React, { useEffect } from 'react';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../Navigation';
import StyledButton from '../../SharedComponents/StyledButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const navScreenPush = (screen: keyof RootStackParamList) => () => {
    navigation.push(screen);
  };

  async function checkIfCrash() {
    try {
      const didCrash = await Crashes.hasCrashedInLastSession();

      console.log({ didCrash });

      if (didCrash) {
        const crashReport = await Crashes.lastSessionCrashReport();
        const na = 'not available';

        console.log({ crashReport });

        const payload = {
          osName: crashReport?.device.osName || na,
          appVersion: crashReport?.device.appVersion || na,
          screenSize: crashReport?.device.screenSize || na,
          model: crashReport?.device.model || na,
          errorTime: crashReport.appErrorTime + '',
        };

        await Analytics.trackEvent('CrashReport', payload);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    checkIfCrash();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>5th Edition</Text>
      <Image source={require('../../../assets/logo.png')} resizeMode="cover" />
      <StyledButton
        text="To Characters"
        onClick={navScreenPush('Characters')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: '#B6B6B6',
    fontSize: 30,
  },
});

export default HomeScreen;
