import request from '@/utils/request';
import { QueryType, CreateQuery, UpdateQuery, RemoveQuery } from './data.d';

export const create = async (params: CreateQuery) =>
  request(`/api/base/data/audit/comment/create`, {
    method: 'post',
    data: params,
  })

export const remove = async (params: RemoveQuery) =>
  request(`/api/base/data/audit/comment/delete`, {
    method: 'post',
    data: params,
  })
export const update = async (params: UpdateQuery) =>
  request(`/api/base/data/audit/comment/modify`, {
    method: 'post',
    data: params,
  })
export const list = async (params: QueryType) =>
  request(`/api/base/data/audit/comment/query`, {
    method: 'post',
    data: params,
  })

// 审核类别
export const getTypeList = async () =>
  request(`/api/base/data/verify/category/select`, {
    method: 'post',
    data: {}
  })
  
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
