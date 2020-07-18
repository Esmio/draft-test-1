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
// 设备列表
export interface MachineType {
  id: string;
  name: string;
  status: number;
  statusText: string;
}
// LGV Time type
export interface LGVTimeType {
  Total?: number;
  id: string;
  lgvName: string;
  epId: string;
  orgId: string;
  mcheId: string;
  runtimeDuration: string;
  freetimeDuration: string;
  chargetimeDuration: string;
  warntimeDuration: string;
  offlinetimeDuration: string;
  startTime: string;
  endTime: string;
}
// OeeType
export interface OeeType {
  lgvName: string;
  idleDuration: number;
  runDuration: number;
  chargeDuration: number;
  wrongDuration: number;
  dataDay: string;
  Total?: number;
}

// mock
export interface AllType {
  customerList: Customer[];
  machineList: MachineType[];
  oeeData: OeeType[];
  lgvTime: LGVTimeType;
}
