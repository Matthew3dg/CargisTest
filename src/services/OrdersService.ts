import api from '../http/index';
import {AxiosResponse} from 'axios';
import {OrdersListResponse} from '../types/ordersList';
import {OrderDetails} from '../types/orderDetails';

export const getOrdersList = async (
  page: number,
): Promise<AxiosResponse<OrdersListResponse>> => {
  // TODO make all parameters "live"
  return api.get(
    `/api/client/v2/order/list?page=${page}&status_1c[0]=active&status_1c[1]=on_pause&status_1c[3]=completed&order_1c_search_is_true=true`,
  );
};

export const getOrderDetails = async (
  orderId: number,
): Promise<AxiosResponse<OrderDetails>> => {
  return api.get(`/api/client/v1/orders/${orderId}`);
};
