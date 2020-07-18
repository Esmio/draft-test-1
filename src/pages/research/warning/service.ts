import request from '@/utils/request';
import qs from 'querystring';
import { DateRangeQuery, PagiType } from './data.d';

// 客户列表
export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}

export async function getDevelopmentStatistics(type: string, params: DateRangeQuery) {
  return request(`/api/development/statistics/${type}?${qs.stringify(params)}`);
}

// 告警列表
// export const getWarnLogList = async (
//   params: DateRangeQuery &
//     PagiType & {
//       machineId?: string;
//       warning?: string;
//       text?: string;
//     },
// ) => request(`/api/micro-hate/forklift/warnLog/list?${qs.stringify(params)}`);

// OEE
export const getOeeData = async (params: PagiType & { mcheId: string; }) =>
  request(`/api/dao-service/hate/forklift/oee/data?${qs.stringify(params)}`);
// 新告警列表
export const getWarnLogList = async (
  params: DateRangeQuery &
    PagiType & {
      machineId?: string;
      exceptionType: string;
    },
) => request(`/api/dao-service/hate/development/warnLog/list?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_device_warning_data');
}
