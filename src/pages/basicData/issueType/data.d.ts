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
  pageNum: number;
  pageSize: number;
  total?: number
}

export interface CreateQuery {
  fraction: string;
  name: string;
}

export interface DeleteQuery {
  id: string;
}

export interface ListItem {
  createTime: string;
  fraction: string;
  id: string;
  name: string;
  userName: string;
}

export interface UpdateQuery extends CreateQuery {
  id: string;
}