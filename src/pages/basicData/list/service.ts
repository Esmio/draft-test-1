import request from '@/utils/request';
import { QueryType } from './data.d';
import qs from 'querystring';

// 清单列表
export const queryAuditList = async (params: QueryType) =>
  request(`/api/base/data/audit/comment/query`, {
    method: 'post',
    data: params,
  })
  
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
