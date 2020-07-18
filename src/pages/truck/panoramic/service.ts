import request from '@/utils/request';
import qs from 'querystring';
import { PagiType } from './data.d';

// 客户列表
export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}
// 基本信息 （页面上站点信息）
export const getBaseInfo = async (params: { customerId: string }) =>
  request(`/api/micro-hate/forklift/panorama/baseInfo?${qs.stringify(params)}`);
// 任务列表
export const getTaskList = async (params: PagiType) =>
  request(`/api/micro-hate/forklift/panorama/taskList?${qs.stringify(params)}`);
// 设备列表
export async function getMachineList(params: PagiType & { status?: number; customerId?: string }) {
  return request(`/api/micro-hate/forklift/machine/list?${qs.stringify(params)}`);
}
// 站点列表
export const getSites = async () => request('/api/micro-hate/forklift/panorama/sites');
// 路线
export const getRoutes = async () => request('/api/micro-hate/forklift/panorama/routes');
// 轨迹显示
export const getMachineAll = async (params: PagiType & { epId: string }) =>
  request(`/api/dao-service/hate/forklift/machine/list2?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_panaroma_data');
}
