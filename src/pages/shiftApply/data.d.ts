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

// ListItemType
export interface ListItemType {
  auditComment: string;
  createAt: string;
  createUserId: string;
  createUserName: string;
  currDate: string;
  id: string;
  originalDate: string;
  processId: string;
  processName: string;
}