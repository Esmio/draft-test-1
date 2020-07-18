import request from '@/utils/request';
import { PagiType } from './data.d';
import qs from 'querystring';

export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}

export async function fetchFakeData() {
  return request('/api/fake_agv_panaroma_data');
}
