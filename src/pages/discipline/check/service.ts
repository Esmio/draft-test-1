import request from '@/utils/request';
import {
  CreateQuery,
  ListQuery,
  UpdateQuery,
  RemoveQuery,
  SubmitQuery,
  AuthQuery,
} from './data.d';

// precreate
export const preCreate = async () =>
  request('/api/process/problemOrder/can/create', {
    method: 'post',
    data: {},
  });
// create
export const create = async (params: CreateQuery) =>
  request('/api/process/problemOrder/create', {
    method: 'post',
    data: params,
  });
// list
export const list = async (params: ListQuery) =>
  request('/api/process/problemOrder/query', {
    method: 'post',
    data: params
  });
// update
export const update = async (params: UpdateQuery) =>
  request('/api/process/problemOrder/update', {
    method: 'post',
    data: params,
  });
// remove
export const remove = async (params: RemoveQuery) =>
  request('/api/process/problemOrder/delete', {
    method: 'post',
    data: params,
  })
// 陪审员列表
export const userList = async () =>
  request('/api/base/data/user/select', {
    method: 'post',
    data: {}
  });
// 问题类别列表
export const categoryList = async () =>
  request('/api/base/data/problem/category/select', {
    method: 'post',
    data: {}
  })
// 问题严重度列表
export const severityList = async () =>
  request('/api/base/data/severity/level/select', {
    method: 'post',
    data: {}
  })
// 提交
export const submit = async (params: SubmitQuery) =>
  request('/api/process/problemOrder/commit', {
    method: 'post',
    data: params,
  })
// 审核
export const auth = async (params: AuthQuery) =>
  request('/api/process/problemOrder/audit', {
    method: 'post',
    data: params,
  })

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
