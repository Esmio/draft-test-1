import request from '@/utils/request';
import { CreateQuery, ListQuery, UpdateQuery, RemoveQuery } from './data.d';
// 增
export const create = async (params: CreateQuery) => 
  request('/api/base/data/user/level/bind', {
    method: 'post',
    data: params,
  })
// 查
export const list = async (params: ListQuery) =>
  request('/api/base/data/user/level/list', {
    method: 'post',
    data: params,
  })
// 改
export const update = async (params: UpdateQuery) =>
  request('/api/base/data/user/level/bind/modify', {
    method: 'post',
    data: params,
  })
// 删
export const remove = async (params: RemoveQuery) =>
  request('/api/base/data/user/level/unbind', {
    method: 'post',
    data: params,
  })
// 获取姓名列表
export const userNameList = async () =>
  request('/api/base/data/user/select', {
    method: 'post',
    data: {},
  })
// 获取部门列表
export const departmentList = async () =>
  request('/api/base/data/depart/select', {
    method: 'post',
    data: {}
  })
// 获取工序列表
export const processList = async () =>
  request('/api/base/data/process/select/all', {
    method: 'post',
    data: {}
  })
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
