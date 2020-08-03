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

export interface ListQuery {
  monthOfYear: string;
}

interface ScoreMap {
  [key: string]: string;
}

export interface ListItem {
  departmentName: string;
  problemCategoryName: string;
  scoreMap: ScoreMap
}