import request from '@/utils/request';
import { PagiType, CreateQuery } from './data.d';
import qs from 'querystring';

// 分层审核类别列表
export const getAuditTypeList = async () =>
  request(`/api/base/data/problem/category/select`, {
    method: 'post',
    data: {},
  })
// 分层审核审核类别新增
export const creatAuditType = async (params: CreateQuery) =>
  request(`/api/base/data/verify/category/create`, {
    method: 'post',
    data: params
  })
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
