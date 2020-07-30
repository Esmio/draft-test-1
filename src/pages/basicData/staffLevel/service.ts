import request from '@/utils/request';
import { PagiType, CreateQuery } from './data.d';

export const create = async (params: CreateQuery) => 
  request('/api/base/data/user/level/bind', {
    method: 'post',
    data: params,
  })

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
