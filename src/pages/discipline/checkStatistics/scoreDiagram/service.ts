import request from '@/utils/request';
import { ListQuery } from './data.d';

export const list = async (params: ListQuery) =>
  request('/api/process/problemOrder/sum/score', {
    method: 'post',
    data: params || {},
  })

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
