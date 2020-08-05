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