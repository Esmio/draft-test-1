import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

// 文件上传
export const upload = async (params: FileList) =>
  request('/api/yp_gate/ypkq/attachment/upload', {
    method: 'post',
    data: params
  });