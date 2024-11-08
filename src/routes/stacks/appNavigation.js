// @app
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// drawerComponentt
import UserAppStack from '../drawer/appDrawer';
// @stack screens
// import HomeStack from '.././stacks/HomeStack';
// import GroupStack from '.././stacks/GroupStack';
// import CategoryStack from '.././stacks/CategoryStack';
// import CheckOutfitStack from './CheckOutfitStack';
// screens
import Home from '../../screens/Main/Home';
import Notification from '../../screens/Main/Notification';
import ChangePassword from '../../screens/Main/ChangePassword';
import Message from '../../screens/Main/Messages';
import BecomeVerifed from '../../screens/Main/BecomeVerified';
import DreamPost from '../../screens/Main/DreamPost';
import EditProfile from '../../screens/Main/EditProfile';
import Faqs from '../../screens/Main/Faqs';
import Comment from '../../components/Comment';
import Subscription from '../../screens/Main/Subscription';
import DreamType from '../../screens/Main/DreamType';
import ProfileHost from '../../screens/Main/ProfileHost.js';
import PostDream from '../../screens/Main/PostDream/PostDream';
import Like from '../../screens/Main/Like/Like';
import Filter from '../../screens/Main/Filter/Filter';
import SavePost from '../../screens/Main/SavePost/SavePost';
import RedeemPoints from '../../screens/Main/RedeemPoints/RedeemPoints.js';
import PurchaseSticker from '../../screens/Main/PurchaseSticker/PurchaseSticker.js';

const Stack = createNativeStackNavigator();

const AppNavigation = ({initialRoute}) => {
  return (
    <Stack.Navigator
      initialRouteName="UserAppStack"
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerTitleAllowFontScaling: true,
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        animation: 'slide_from_right',

      }}>
      <Stack.Screen name="UserAppStack" component={UserAppStack} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="BecomeVerifed" component={BecomeVerifed} />
      <Stack.Screen name="DreamPost" component={DreamPost} />
      <Stack.Screen name="DreamType" component={DreamType} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Faqs" component={Faqs} />
      <Stack.Screen name="Comment" component={Comment} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="ProfileHost" component={ProfileHost} />
      <Stack.Screen name="PostDream" component={PostDream} />
      <Stack.Screen name="Like" component={Like} />
      <Stack.Screen
        name="Filter"
        options={{animation: 'slide_from_bottom'}}
        component={Filter}
      />
      <Stack.Screen name="SavePost" component={SavePost} />
      <Stack.Screen name="RedeemPoints" component={RedeemPoints} />
      <Stack.Screen name="PurchaseSticker" component={PurchaseSticker} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
