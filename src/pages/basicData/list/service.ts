import request from '@/utils/request';
import { QueryType } from './data.d';
import qs from 'querystring';

export const queryAuditList = async (params: QueryType) =>
  request(`/api/base/data/audit/comment/query`, {
    method: 'post',
    data: params,
  })

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
