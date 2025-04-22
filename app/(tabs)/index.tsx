import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from '../../screen/Homescreen';
import HelpAndSupport from '../../screen/HelpAndSupport';
import Notifications  from '../../screen/Notifications';
import StatisticalReport from '../../screen/StatisticalReport';
import { RootStackParamList } from '../../navigation/type';
import Login from '../../screen/Login';
import Signup from '../../screen/Signup';
import Profile from '../../screen/Profile';
import { useAuth } from '../../navigation/AuthContext';
import { NavigationProp } from '@react-navigation/native';

import { NavigationIndependentTree, NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <LinearGradient
      colors={["#BFFFC8", "#49C5B6"]}
      style={styles.background}
    >
      <StatusBar style="auto" />
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
            <Stack.Screen name="StatisticalReport" component={StatisticalReport} />
            <Stack.Screen name="Notifications" component={Notifications} />  
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});