import request from '@/utils/request';
import { PagiType } from './data.d';
import qs from 'querystring';

export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/customer/list?${qs.stringify(params)}`);
}
// 图片信息
export const getImageInfo = async (params: { customerId: string }) =>
  request(`/api/micro-hate/visual/production/image/info?${qs.stringify(params)}`);
// 配置信息
export const getConfigInfo = async (params: { customerId: string }) =>
  request(`/api/micro-hate/visual/production/config/info?${qs.stringify(params)}`);
// 日志信息
export const getLoggingInfo = async (params: { customerId: string; date: string; level: string; }) =>
  request(`/api/micro-hate/visual/production/logging/info?${qs.stringify(params)}`);
// 动态链接库
export const getLibraryInfo = async (params: { customerId: string }) =>
  request(`/api/micro-hate/visual/production/library/info?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_equipment_data');
}
