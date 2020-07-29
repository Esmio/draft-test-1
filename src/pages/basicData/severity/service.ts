import request from '@/utils/request';
import { CreateQuery, RemoveQuery, UpdateQuery } from './data.d';

export const create = async (params: CreateQuery) =>
  request(`/api/base/data/severity/level/create`, {
    method: 'post',
    data: params,
  })
export const remove = async (params: RemoveQuery) =>
  request(`/api/base/data/severity/level/delete`, {
    method: 'post',
    data: params,
  })
export const update = async (params: UpdateQuery) =>
  request(`/api/base/data/severity/level/modify`, {
    method: 'post',
    data: params,
  })
export const list = async () =>
  request(`/api/base/data/severity/level/select`, {
    method: 'post',
    data: {},
  })
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
