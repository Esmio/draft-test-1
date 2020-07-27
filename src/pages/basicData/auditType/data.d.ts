// mock
export interface AllType {
}
export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}
// CreateQuery
export interface CreateQuery {
  name: string;
}

export interface ListItem {
  createTime: string;
  parentId: string;
  parentName: string;
}

// 分页
export type PagiType = {
  pageNum: number;
  pageSize: number;
  total?: number
}

