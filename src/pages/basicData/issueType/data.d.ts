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
  name: string;
}

export interface DeleteQuery {
  id: string;
}

export interface ListItem {
  createTime: string;
  parentId: string;
  parentName: string;
}

export interface UpdateQuery {
  id: string;
  problemCategoryName: string;
}