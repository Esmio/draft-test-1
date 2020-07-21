import request from '@/utils/request';
import { PagiType } from './data.d';
import qs from 'querystring';

// 客户列表
export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}
// 计划排版看板列表
export const getPlanBoard = async (params: { userName: string; }) =>
  request(`/api/auto/plan/board/query`, {
    method: 'post',
    data: params,
  })
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
