import request from '@/utils/request';
import { CreateQuery, DeleteQuery, UpdateQuery } from './data.d';
// 增
export const create = async (params: CreateQuery) =>
  request(`/api/base/data/severity/level/create`, {
    method: 'post',
    data: params
  })
// 删
export const remove = async (params: DeleteQuery) =>
  request(`/api/base/data/severity/level/delete`, {
    method: 'post',
    data: params
  })
// 改
export const update = async (params: UpdateQuery) =>
  request(`/api/base/data/severity/level/modify`, {
    method: 'post',
    data: params
  })
// 查
export const list = async () =>
  request(`/api/base/data/severity/level/select`, {
    method: 'post',
    data: {}
  })

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
