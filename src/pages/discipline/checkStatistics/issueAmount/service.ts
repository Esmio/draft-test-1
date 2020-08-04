import request from '@/utils/request';
import { PagiType, ListQuery } from './data.d';

// 问题数量统计
export const list = async (params: ListQuery) =>
  request('/api/process/problemOrder/sum/count', {
    method: 'post',
    data: params
  })

// 获取部门列表
export const departmentList = async () =>
  request('/api/base/data/depart/select', {
    method: 'post',
    data: {}
  })
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
