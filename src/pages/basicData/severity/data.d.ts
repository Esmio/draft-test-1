// mock
export interface AllType {
}
export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}
// 分页
export type PagiType = {
  pageNum: number;
  pageSize: number;
  total?: number
}

export interface ListItem {
  createTime: string;
  fraction: string;
  id: string;
  name: string;
}
export interface CreateQuery {
  fraction: string;
  name: string;
}
export interface RemoveQuery {
  id: string;
}
export interface UpdateQuery {
  fraction: string;
  id: string;
  name: string;
}
