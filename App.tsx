/**
 * @format
 */

import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type RootStackParamList = {
  Home: undefined;
  ChatRooms: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = (props: HomeScreenProps) => {
  // Handle user state changes
  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = u => {
    if (u !== null) {
      props.navigation.replace('ChatRooms');
    }
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  });

  useEffect(() => {
    // Trigger anonymous login
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.error('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }, []);

  return <></>;
};

type ChatRoomsProps = NativeStackScreenProps<RootStackParamList, 'ChatRooms'>;
const ChatRooms = (props: ChatRoomsProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User>();
  useEffect(() => {
    return auth().onAuthStateChanged(u => {
      if (u === null) {
        // Logged out. Redirect to login screen
        props.navigation.replace('Home');
        return;
      }
      if (u) {
        setUser(u);
      }
    });
  });
  return <Text>Chat rooms for {user?.uid}</Text>;
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
          <Stack.Screen
            name="ChatRooms"
            component={ChatRooms}
            options={{title: 'Chat Rooms'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});

export default App;
