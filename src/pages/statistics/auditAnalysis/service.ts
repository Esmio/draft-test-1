import request from '@/utils/request';
import { PagiType } from './data.d';
import qs from 'querystring';



export async function fetchFakeData() {
  return request('/api/fake_truck_detection_data');
}
