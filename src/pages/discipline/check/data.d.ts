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
  page: number;
  size: number;
  total?: number
}

export interface Juror {
  processId: number;
  userId: string;
  userName: string;
}

export interface CreateQuery {
  auditComment: string;
  checkPlanId: number;
  dealWithImage: string;
  departmentName: string;
  dutyUserId: string;
  dutyUserName: string;
  imageUrl: string;
  jurors: Juror[],
  problemCategoryDeduction: number;
  problemCategoryId: number;
  problemCategoryName: string;
  problemDesc: string;
  produceUserId: string;
  produceUserName: string;
  qualityUserId: string;
  qualityUserName: string;
  reason: string;
  severityId: number;
  severityName: string;
  step: string;
}

export interface ListQuery {
  auditFail: boolean,
  checkDate: string;
  checkUserName: string;
  departmentId: string;
  no: string;
  page: number,
  size: number,
  status: string;
}

export interface UpdateQuery extends CreateQuery {
  id: number;
}

export interface RemoveQuery {
  processProblemId: string[];
}

export interface ListItem extends Partial<CreateQuery> {
  id: number;
  planDate: string;
  processProblemUserDtoList: Juror[];
  categoryId: number;
}

export interface PreCreateItem {
  departmentId: string;
  departmentName: string;
  id: number;
  planDate: string;
  produceUserId: string;
  produceUserName: string;
  qualityUserId: string;
  qualityUserName: string;
}
// 陪审员
export interface UserItem {
  id: string;
  realName: string;
}
// 问题严重度
export interface SeverityListItem {
  createTime: string;
  fraction: string;
  id: string;
  name: string;
}
// 问题类别
export interface IssueTypeListItem {
  createTime: string;
  parentId: string;
  parentName: string;
}