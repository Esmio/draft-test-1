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
// 客户
export interface Customer {
  id: string;
  name: string;
  logo: string;
  province: string;
  city: string;
  orgId: string;
}
// 设备
export interface Machine {
  id: string;
  name: string;
  machineImage: string;
  status: number;
  statusText: string;
}
// 实时检测
export interface RealTime {
  id: string;
  name: string;
  status: number;
  statusText: string;
  positionX: number;
  positionY: number;
  angle: string;
  battery: string;
  factory: string;
  address: string;
  installDate: string;
  startTime: string;
  totalRuntime: string;
  machineImage: string;
  lgvIpAddress: string;
  lgvType: string;
  lgvLoad: string;
  lgvMaxSpeed: string;
  lgvLoading: string;
  lgvPath: string;
  lgvUnloadSpeed: string;
}
// 任务列表
export interface TaskType {
  id: string;
  name: string;
  machineId: string;
  machine: string;
  startSite: string;
  startAction: string;
  targetSite: string;
  targetAction: string;
  taskStatus: string;
  taskTime: string;
}

// mock
export interface AllType {
  customerList: Customer[];
  taskList: TaskType[];
}