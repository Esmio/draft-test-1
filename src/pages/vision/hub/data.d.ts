export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}
// 分页
export type PagiType = {
  pageNum: string;
  pageSize: string;
}
// 客户
export interface Customer {
  id: string;
  name: string;
  logo: string;
  province: string;
  city: string;
  orgId: string;
}
// 表格
export interface ChartItem {
  time: string;
  value: string;
}

// mock
export interface AllType {
  customerList: Customer[];
}