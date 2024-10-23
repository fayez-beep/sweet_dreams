// @app
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// @stack screens

import Home from '../../screens/Main/Home';
import Message from '../../screens/Main/Messages';
import Journal from '../../screens/Main/Journal';
import DreamType from '../../screens/Main/DreamType/DreamType';
import BecomeVerifed from '../../screens/Main/BecomeVerified/BecomeVerifed';
import DreamPost from '../../screens/Main/DreamPost';
const Stack = createNativeStackNavigator();

const HomeStack = ({initialRoute}) => {
  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="HomeStack" component={Home} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Journal" component={Journal} />
      <Stack.Screen name="DreamType" component={DreamType} />
      <Stack.Screen name="BecomeVerifed" component={BecomeVerifed} />
      {/* <Stack.Screen name="DreamPost" component={DreamPost} /> */}




    </Stack.Navigator>
  );
};

export default HomeStack;
