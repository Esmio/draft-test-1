import request from '@/utils/request';
import { PagiType } from './data.d';
import qs from 'querystring';

// 客户列表
export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}
// 设备列表
export const getMachineList = async (params: PagiType & {customerId: string}) =>
  request(`/api/micro-hate/forklift/machine/list?${qs.stringify(params)}`);
// 实时检测
export const getRealTime = async (params: { machineId: string }) => 
  request(`/api/micro-hate/forklift/machine/${params.machineId}`);
// 任务列表
export const getTaskList = async (params: PagiType & { machineId?: string }) =>
  request(`/api/dao-service/hate/forklift/machine/taskList?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
