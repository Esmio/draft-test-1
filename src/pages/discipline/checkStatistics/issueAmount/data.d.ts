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

// ListQuery
export interface ListQuery {
  departmentId: string;
  monthOfYear: string;
}

// Department
export interface Department {
  createTime: string;
  parentId: string;
  parentName: string;
}
// ChartItem
export interface ChartItem {
  x: string;
  y: number;
  type?: string;
}