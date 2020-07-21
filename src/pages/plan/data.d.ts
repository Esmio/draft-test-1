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
// UserPlan
export interface UserPlan {
  userId: string;
  userLevel: string;
  userName: string;
}
// Plan
export interface Plan {
  departmentId: string;
  departmentName: string;
  processId: string;
  processName: string;
  userPlan: UserPlan[];
}
// PlanList
export interface PlanWithDate {
  date: string;
  plan: Plan[];
}
// mock
export interface AllType {
}