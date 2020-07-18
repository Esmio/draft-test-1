import request from '@/utils/request';
import qs from 'querystring';
import { DateRangeQuery, PagiType } from './data.d';

export async function getTypeErrors(params: DateRangeQuery) {
  return request(`/api/forklift/statistics/errorByType?${qs.stringify(params)}`);
}

export async function getNameErrors(params: DateRangeQuery) {
  return request(`/api/forklift/statistics/errorByName?${qs.stringify(params)}`);
}

export async function fakeChartData() {
  return request('/api/fake_failure_chart_data');
}

// 错误种类统计
export const getErrorsByType = async (params: DateRangeQuery) =>
  request(`/api/micro-hate/forklift/statistics/errorByType?${qs.stringify(params)}`);
// 叉车名称错误统计
export const getErrorsByName = async (params: DateRangeQuery) =>
  request(`/api/micro-hate/forklift/statistics/errorByName?${qs.stringify(params)}`);
// 任务统计
export const getTaskStatistics = async (params: DateRangeQuery) =>
  request(`/api/micro-hate/forklift/statistics/task?${qs.stringify(params)}`);

// 告警列表
export const getWarnLogList = async (
  params: DateRangeQuery &
    PagiType & {
      machineId?: string;
      warning?: string;
      text?: string;
    },
) => request(`/api/micro-hate/forklift/warnLog/list?${qs.stringify(params)}`);
