import {makeAutoObservable} from 'mobx';
import {getOrderDetails, getOrdersList} from '../services/OrdersService';
import {Alert} from 'react-native';
import {OrderItem} from '../types/ordersList';

class Order {
  constructor() {
    makeAutoObservable(this);
  }

  ordersList: OrderItem[] = [];
  orderDetails: {} = {};

  setOrdersList(list: OrderItem[]) {
    this.ordersList = list;
  }
  setOrderDetails(details: {}) {
    this.orderDetails = details;
  }

  async getOrdersList(page: number) {
    try {
      const response = await getOrdersList(page);
      this.setOrdersList(response.data.orders);

      console.log('getOrdersList');
      console.log(response.data);
    } catch (error) {
      Alert.alert('Ошибка списка заявок', 'Пожалуйста попробуйте снова');
    }
  }

  async getOrderDetails(orderId: number) {
    try {
      const response = await getOrderDetails(orderId);
      this.setOrderDetails(response.data);

      console.log('getOrderDetails');
      console.log(response.data);
    } catch (error) {
      Alert.alert('Ошибка деталей заявки', 'Пожалуйста попробуйте снова');
    }
  }
}

export default new Order();
