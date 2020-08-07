import { ValidateStatus } from 'antd/lib/form/FormItem';

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

// check
export interface CreateCheckQuery {
  date: string;
  type: number;
}
// create
export interface CreateQuery {
  currDate: string;
  originalDate: string;
  type: number,
}
// ListQuery
export interface ListQuery {
  createUserId: string;
  flowStatus: number;
  page: number;
  processId: string;
  size: number;
  type: number;
}
// ListItem
export interface ListItem {
  auditComment: string;
  createAt: string;
  createUserId: string;
  createUserName: string;
  currDate: string;
  departmentName: string;
  id: number;
  originalDate: string;
  processId: string;
  processName: string;
}
// updateQuery
export interface UpdateQuery {
  currDate: string;
  id: number;
  originalDate: string;
  type: number;
}
// removeQuery
export interface RemoveQuery {
  id: number;
  type: number;
}
// ValidateType
export interface ValidateType {
  status?: ValidateStatus;
  msg?: string;
}
// CommitQuery
export interface CommitQuery {
  id: number;
  type: number;
}
// AuthQuery
export interface AuthQuery {
  id: number;
}