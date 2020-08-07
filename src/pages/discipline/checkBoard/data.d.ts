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
  page: number;
  size: number;
  total?: number
}
// ListQuery
export interface ListQuery {
  page: number;
  size: number;
  status: string;
}
// UserItem
export interface UserItem {
  processId: number;
  userId: string;
  userName: string;
}