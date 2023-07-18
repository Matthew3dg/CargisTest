import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '../types/navigation';

// SCREENS
import HomeScreen from '../screens/OrderDetails';
import LoginScreen from '../screens/OrdersList';
import OrdersList from '../screens/OrdersList';
import OrderDetails from '../screens/OrderDetails';

const Stack = createNativeStackNavigator<StackParamList>();

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    marginHorizontal: 'auto',
  },
  logo: {
    width: 49,
    height: 40,
    marginHorizontal: 'auto',
  },
  xcross: {
    width: 20,
    height: 20,
  },
});

const StackNavigator = () => {
  const headerSettings = (title: string) => {
    return {
      title: title,
      headerShadowVisible: false,
      headerTitleStyle: {
        color: '#296267',
        fontSize: 16,
        fontFamily: 'Lato-Regular',
      },
      headerTintColor: '#296267',
    };
  };

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
