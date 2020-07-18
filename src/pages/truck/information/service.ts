import request from '@/utils/request';
import { DateRangeQuery } from './data.d';
import queryString from 'querystring';

export async function getTypeErrors(params: DateRangeQuery) {
  return request(`/api/forklift/statistics/errorByType?${queryString.stringify(params)}`)
}

export async function getNameErrors(params: DateRangeQuery) {
  return request(`/api/forklift/statistics/errorByName?${queryString.stringify(params)}`)
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}