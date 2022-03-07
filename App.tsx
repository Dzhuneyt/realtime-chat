/**
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  return <Text>Home Screen</Text>;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
      }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Loading'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});

export default App;
