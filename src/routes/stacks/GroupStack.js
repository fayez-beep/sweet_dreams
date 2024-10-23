// @app
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// @stack screens

import Group from '../../screens/Main/Groups';
import DreamType from '../../screens/Main/DreamType/DreamType';
const Stack = createNativeStackNavigator();

const GroupStack = ({initialRoute}) => {
  return (
    <Stack.Navigator
      initialRouteName="Group"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="Group" component={Group} />
      <Stack.Screen name="DreamType" component={DreamType} />

    </Stack.Navigator>
  );
};

export default GroupStack;
