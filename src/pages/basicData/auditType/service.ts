import request from '@/utils/request';
import { CreateQuery, EditQuery, DeleteQuery } from './data.d';

// 分层审核类别列表
export const getAuditTypeList = async () =>
  request(`/api/base/data/verify/category/select`, {
    method: 'post',
    data: {},
  })
// 分层审核审核类别新增
export const creatAuditType = async (params: CreateQuery) =>
  request(`/api/base/data/verify/category/create`, {
    method: 'post',
    data: params
  })
// 分层审核类别更新
export const updateAuditType = async (params: EditQuery) =>
  request(`/api/base/data/verify/category/modify`, {
    method: 'post',
    data: params,
  });
// 问题类别删除接口
export const deleteAuditType = async (params: DeleteQuery) =>
  request(`/api/base/data/verify/category/del`, {
    method: 'post',
    data: params,
  });

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
