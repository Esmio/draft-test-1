import request from '@/utils/request';
import { PagiType } from './data.d';
import qs from 'querystring';

export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/customer/list?${qs.stringify(params)}`);
}
// 轮毂型号列表
export const getWheelList = async (params: { customerId: string }) =>
  request(`/api/micro-hate/visual/production/wheel/list?${qs.stringify(params)}`);
// 轮毂信息
export const getWheelInfo = async (params: { wheel: string }) =>
  request(`/api/micro-hate/visual/production/wheel/info?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_hub_data');
}
