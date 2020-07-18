import request from '@/utils/request';
import qs from 'querystring';
import { PagiType } from './data.d';

export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}
// 小车状态信息+当前任务
export async function getAGVInfo(params: PagiType) {
  return request(`/api/micro-hate/logistics/info?${qs.stringify(params)}`);
}
// 历史任务
export async function getTasks(params: PagiType) {
  return request(`/api/micro-hate/micro-hate/logistics/task?${qs.stringify(params)}`);
}
// 充电统计时间
export const getChargingTime = async (params: { agvNum: string; }) =>
  request(`/api/micro-hate/logistics/statistics/charge?${qs.stringify(params)}`);
export async function fetchFakeData() {
  return request('/api/fake_agv_detection_data');
}
