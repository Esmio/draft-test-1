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
// AGVInfo
export interface AGVInfoType {
  agvCurrentStationNum: string;
  agvDirection: string;
  agvDistance: string;
  agvErrorMessage: string;
  agvErrorMessageText: string;
  agvIpAddress: string;
  agvNum: string;
  agvReceiveTime: string;
  agvSpeed: string;
  agvState: string;
  agvStateText: string;
  agvTargetStationNum: string;
  agvVoltage: string;
  epId: string;
  mcheId: string;
  orgId: string;
}
// Task
export interface TaskType {
  autoState: string;
  deviceModel: string;
  epId: string;
  id: string;
  mcheId: string;
  orgId: string;
  startStation: string;
  targetStation: string;
  taskModel: string;
  taskState: string;
  updateTime: string;
}

// mock
export interface AllType {
  customerList: Customer[];
  agvInfoList: AGVInfoType[];
  taskList: TaskType[];
}
