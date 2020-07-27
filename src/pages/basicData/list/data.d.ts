// mock
export interface AllType {
}
export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}
// 分页
export interface PagiType {
  page: number;
  size: number;
  total?: number
}
// querytype
export interface QueryType extends PagiType {
  auditCategoryId: number;
  userName: string;
}