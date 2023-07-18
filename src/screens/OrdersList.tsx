import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import {StackParamList} from '../types/navigation';

const OrdersList = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'OrdersList'>) => {
  return (
    <Text onPress={() => navigation.navigate('OrderDetails')}>OrdersList</Text>
  );
};

export default OrdersList;
