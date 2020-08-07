import request from '@/utils/request';
import {
  CreateQuery,
  CreateCheckQuery,
  ListQuery,
  UpdateQuery,
  RemoveQuery,
  CommitQuery,
  AuthQuery,
} from './data.d';

// create
export const create = async (params: CreateQuery) =>
  request('/api/plan/change/create', {
    method: 'post',
    data: {...params, type: 0}
  })
// update
export const update = async (params: UpdateQuery) =>
  request('/api/plan/change/modify', {
    method: 'post',
    data: {...params, type: 0},
  })
// list
export const list = async (params: ListQuery) =>
  request('/api/plan/change/list', {
    method: 'post',
    data: {...params, type: 0},
  })
// remove
export const remove = async (params: RemoveQuery) =>
  request('/api/plan/change/del', {
    method: 'post',
    data: {...params, type: 0},
  });
// check
export const check = async (params: CreateCheckQuery) =>
  request('/api/verify/work/task/get', {
    method: 'post',
    data: {...params, type: 0},
  });
// 提交
export const commit = async (params: CommitQuery) =>
  request('/api/plan/change/ask', {
    method: 'post',
    data: {...params, type: 0},
  })
// 审核
export const auth = async (params: AuthQuery) =>
  request('/api/plan/change/verify', {
    method: 'post',
    data: {...params, type: 0},
  });
export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
