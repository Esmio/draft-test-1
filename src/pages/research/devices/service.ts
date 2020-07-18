import qs from 'querystring';
import { message } from 'antd';
import request from '@/utils/request';
import { PagiType, OrderType } from './data.d';

type GetRealTimeQuery = {
  machineId: string;
  type: string;
  total: number;
};

// 客户列表
export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}
// 设备列表
export async function getMachineList(params: PagiType & { customerId: string }) {
  return request(`/api/micro-hate/development/machine/list?${qs.stringify(params)}`);
}
// 设备检测
export async function getMachineStatus(params: { machineId: string }) {
  return request(`/api/dao-service/hate/development/machine/status?${qs.stringify(params)}`);
}
// 发送指令 接口完成，但是未调通。
export async function sendOrder({ cmdStr, mcheId }: { cmdStr: string; mcheId: string; }) {
  return request(`/api/dao-service/hate/development/mqtt/cmd?mcheId=${mcheId}`, {
    method: 'POST',
    data: {
      cmdStr,
    },
  });
}
// 关节数据
export async function getNewRealTime(params: { machineId: string; total: number }) {
  return request(`/api/dao-service/hate/development/joint/record/realtime?${qs.stringify(params)}`)
}
// 无用
// eslint-disable-next-line consistent-return
export async function sendOrder2({ value }: { value: string }) {
  let data: OrderType | null = null;
  try {
    data = JSON.parse(value);
    return request('/api/micro-hate/forklift/mqtt/mes', {
      method: 'POST',
      data,
    });
  } catch (e) {
    message.error('请输入正确的JSON');
  }
}
// 加工路径
export async function getMachinePath(params: { machineId: string; wheel: string }) {
  return request(`/api/micro-hate/development/machine/path?${qs.stringify(params)}`);
}

export async function getRealTime(params: GetRealTimeQuery) {
  return request(`/api/micro-hate/development/point/record/realtime?${qs.stringify(params)}`);
}
// 轮毂型号
export async function getWheelList(params: { machineId: string }) {
  return request(`/api/micro-hate/development/machine/wheel/list?${qs.stringify(params)}`);
}

export async function fetchFakeData() {
  return request('/api/fake_data');
}
