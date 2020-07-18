import request from '@/utils/request';
import qs from 'querystring';
import { PagiType, DateRangeQuery } from './data.d';

// 客户列表
export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}

// 设备列表
export const getMachineList = async (params: PagiType & { status?: number; customerId?: string }) =>
  request(`/api/micro-hate/forklift/machine/list?${qs.stringify(params)}`);

// AGV
export const getLgvTime = async (params: { date: string; scaleType: string; lgvName: string; }) =>
  request(`/api/micro-hate/forklift/statistics/lgvtime?${qs.stringify(params)}`);

// oee

export const getOee = async (params: DateRangeQuery & {
  epid: string;
  orgId: string;
  lgvName: string;
}) =>
  request(`/api/dao-service/hate/forklift/statistics/oee?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_truck_statistic_data');
}
