import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '../types/navigation';

// SCREENS
import OrdersList from '../screens/OrdersList';
import OrderDetails from '../screens/OrderDetails';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersList"
        component={OrdersList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
