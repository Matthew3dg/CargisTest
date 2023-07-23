import {makeAutoObservable} from 'mobx';
import {getOrderDetails, getOrdersList} from '../services/OrdersService';
import {Alert} from 'react-native';
import {OrderItem} from '../types/ordersList';
import {OrderDetails} from '../types/orderDetails';

class Order {
  constructor() {
    makeAutoObservable(this);
  }

  ordersList: OrderItem[] = [];
  totalPagesCount: number = 0;
  orderDetails: OrderDetails = {} as OrderDetails;

  setOrdersList(list: OrderItem[]) {
    this.ordersList = list;
  }
  setTotalPagesCount(num: number) {
    this.totalPagesCount = num;
  }
  setOrderDetails(details: OrderDetails) {
    this.orderDetails = details;
  }

  async getOrdersList(page: string) {
    try {
      const response = await getOrdersList(page);

      this.setTotalPagesCount(response.data.total_page);

      console.log('getOrdersList');
      console.log(response.data);

      return response.data.orders;
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
