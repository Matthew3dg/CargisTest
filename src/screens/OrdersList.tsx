import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, SafeAreaView, FlatList} from 'react-native';
import {StackParamList} from '../types/navigation';
import {observer} from 'mobx-react-lite';
import s from '../styles/index';
import orders from '../store/orders';
import {OrderItem} from '../types/ordersList';

const OrdersList = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'OrdersList'>) => {
  type RenderOrdersProps = {
    item: OrderItem;
    index: number;
  };

  const renderOrder = ({item, index}: RenderOrdersProps) => (
    <Text style={{color: '#000'}}>Order {item.id}</Text>
  );

  return (
    <SafeAreaView style={s.wrapper}>
      <FlatList
        data={orders.ordersList}
        renderItem={renderOrder}
        // keyExtractor={item => item.id.toString()}
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        // onRefresh={}
        // refreshing={}
      />
      <Text onPress={() => navigation.navigate('OrderDetails')}>
        OrdersList
      </Text>
    </SafeAreaView>
  );
};

export default observer(OrdersList);
