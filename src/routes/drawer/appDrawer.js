import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomTabs} from '../tabs/BottomTabs';
import DrawerComp from '../../components/Drawer';
import Settings from '../../screens/settings/index'
const Drawer = createDrawerNavigator();

const UserAppStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '90%',
          backgroundColor: 'transparent',
        },
      }}
      drawerContent={props => <DrawerComp {...props} />}
      initialRouteName={'Home'}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export default UserAppStack;
