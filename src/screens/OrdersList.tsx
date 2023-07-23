import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Text, SafeAreaView, FlatList, ScrollView, View} from 'react-native';
import {StackParamList} from '../types/navigation';
import {observer} from 'mobx-react-lite';
import s from '../styles/index';
import orders from '../store/orders';
import {OrderItem} from '../types/ordersList';
import CollapsibleOrderItem from '../components/CollapsibleOrderItem';
import SearchLabel from '../components/SearchLabel';
import useSWR from 'swr';

const mockSearchLabels = [
  {
    id: 'all',
    title: 'Все',
  },
  {
    id: 'active',
    title: 'Активные',
  },
  {
    id: 'on_pause',
    title: 'На паузе',
  },
  {
    id: 'completed',
    title: 'Завершенные',
  },
];

const OrdersList = ({
  navigation,
}: NativeStackScreenProps<StackParamList, 'OrdersList'>) => {
  type RenderOrdersProps = {
    item: OrderItem;
    index: number;
  };
  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);

  const getList = async (page: string) => {
    console.log('getList loader func');
    return await orders.getOrdersList(page);
  };

  const {data, error, isLoading, mutate} = useSWR(
    currentPage.toString(),
    getList,
  );

  const changeCurrentPage = () => {
    if (currentPage === orders.totalPagesCount) {
      return;
    } else {
      console.log('loadMoreOrders');
      setCurrentPage(prev => ++prev);
    }
  };
  const reloadOrdersList = () => {
    mutate([], ...[]);
    setCurrentPage(0);
  };

  useEffect(() => {
    if (currentPage > 0) {
      data && orders.setOrdersList(orders.ordersList.concat(data));
    } else {
      data && orders.setOrdersList(data);
    }
  }, [data]);

  // useEffect(() => {
  //   if (currentPage <= orders.totalPagesCount) {
  //     console.log('useEffect loader');
  //     setRefreshing(true);
  //     orders.getOrdersList(currentPage).finally(() => setRefreshing(false));
  //   }
  // }, [currentPage]);

  const renderOrder = ({item, index}: RenderOrdersProps) => (
    <CollapsibleOrderItem
      id={item.id}
      order_number={item.order_number}
      views_count={item.views_count}
      create_dt={item.create_dt}
      load_dt={item.load_dt}
      ending_dt={item.ending_dt}
      loading_address={item.loading_address}
      unloading_address={item.unloading_address}
      distance_m={item.distance_m}
      cargo_type={item.cargo_type}
      tonnage_balance_kg={item.tonnage_balance_kg}
      tonnage_kg={item.tonnage_kg}
      tariff_c={item.tariff_c}
      tariff_nds_c={item.tariff_nds_c}
      status_1c={item.status_1c}
      companyName={item.company.short_name}
    />
  );

  return (
    <SafeAreaView style={s.wrapper}>
      <Text style={s.title}>Заявки на перевозки</Text>
      <View style={s.tabsRow}>
        <View style={s.tabContainer}>
          <Text style={s.tabText}>Карта</Text>
        </View>
        <View style={s.tabContainer}>
          <Text style={[s.tabText, s.tabActiveText]}>Список</Text>
          <View style={s.activeTabUnderline}></View>
        </View>
      </View>
      <ScrollView
        style={{flexGrow: 0}}
        contentContainerStyle={{paddingLeft: 16, paddingVertical: 16}}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {mockSearchLabels.map((category, index) => {
          return (
            <SearchLabel
              key={category.id}
              label={category.title}
              setActive={() => setActiveCategoryId(category.id)}
              isActive={category.id === activeCategoryId}
              onPress={() => {
                console.warn('TODO change category request');
                if (category.id === 'all') {
                  //   request all categories
                } else {
                  //   request current category
                }
              }}
            />
          );
        })}
      </ScrollView>
      <FlatList
        style={s.listContainer}
        data={orders.ordersList}
        renderItem={renderOrder}
        keyExtractor={item => item.id.toString()}
        onRefresh={reloadOrdersList}
        refreshing={isLoading}
        onEndReached={changeCurrentPage}
        onEndReachedThreshold={0.3}
      />
    </SafeAreaView>
  );
};

export default observer(OrdersList);
