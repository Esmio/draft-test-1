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

// ListItem
export interface ListItem {
  createAt: string;
  departId: string;
  departName: string;
  jobLevel: string;
  processId: string;
  processName: string;
  updateAt: string;
  userId: string;
  realName: string;
}

export interface CreateQuery {
  departmentId: string;
  jobLevel: string;
  processId: string;
  userId: string;
  realName: string;
}

export interface UserName {
  id: string;
  realName: string;
}

export interface Department {
  createTime: string;
  parentId: string;
  parentName: string;
}

// Process
export interface ProcessType {
  childId: string;
  childName: string;
  createTime: string;
}

// 主列表
export interface ListQuery extends PagiType {
  departmentId?: string;
  searchUserName?: string;
}
// 修改
export interface UpdateQuery {
  departId: string;
  jobLevel: string;
  processId: string;
  userId: string;
  realName: string;
}
// 删除
export interface RemoveQuery {
  id: string;
}