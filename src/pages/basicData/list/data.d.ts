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
  auditCategoryId: string;
}

export interface CreateQuery {
  auditCategoryId: string;
  auditComment: string;
  no: string;
  processIds: string[];
  useLevel: string;
  userName: string;
}

export interface RemoveQuery {
  id: string;
}

export interface UpdateQuery extends CreateQuery {
  id: string;
}

export interface TypeListItem {
  createTime: string;
  parentId: string;
  parentName: string;
}