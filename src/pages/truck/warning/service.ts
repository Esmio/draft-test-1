import request from '@/utils/request';
import qs from 'querystring';
import { PagiType, DateRangeQuery } from './data.d';

export async function getCustomerList(params: PagiType & { linkMan: string }) {
  return request(`/api/micro-hate/customer/list?${qs.stringify(params)}`);
}

// 告警列表
export const getWarnLogList = async (
  params: DateRangeQuery &
    PagiType & {
      machineId?: string;
      warning?: string;
      text?: string;
    },
) => request(`/api/micro-hate/forklift/warnLog/list?${qs.stringify(params)}`);

export async function fetchFakeData() {
  return request('/api/fake_truck_warning_data');
}
