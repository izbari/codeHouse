import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack'

import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Rooms from './Pages/Rooms';
import InsideRoom from './Pages/InsideRoom';

const Stack = createNativeStackNavigator();



 function App(props) {
  return (
    <NavigationContainer >
      <Stack.Navigator>
      <Stack.Screen  name="SignIn" component={SignIn} />
      <Stack.Screen  name="SignUp" component={SignUp} />
      <Stack.Screen  name="Rooms" component={Rooms} />
      <Stack.Screen options={({ route }) => ({ title: route.params.roomName })}  name="InsideRoom" component={InsideRoom} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;