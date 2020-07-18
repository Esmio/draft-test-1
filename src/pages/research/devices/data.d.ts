export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}

// 接口返回类型
export interface ResponseType<T> {
  errCode: number;
  msg: string;
  data: T;
}
// 机器人状态
export interface MachineStatus {
  machineId: string;
  machine: string;
  x: string;
  y: string;
  z: string;
  rx: string;
  ry: string;
  rz: string;
  j1: string;
  j2: string;
  j3: string;
  j4: string;
  j5: string;
  j6: string;
  speed: string;
  power: string;
  moment: string;
}
// 分页
export type PagiType = {
  pageNum: string;
  pageSize: string;
};
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
// 指令
export interface OrderType {
  taskName: string;
  lgvName: string;
  startSite: string;
  startSite_action: string;
  startSite_LG: string;
  endSite: string;
  endSite_action: string;
  endSite_LG: string;
  isdone: string;
}
// 表格列表
export interface PathType {
  order?: number;
  x: string;
  y: string;
  z: string;
  q0: string;
  q1: string;
  q2: string;
  q3: string;
}

// 表格
export interface ChartItem {
  time: string;
  value: string;
  type?: string | undefined;
}

// mock
export interface AllType {
  customerList: Customer[];
  machineList: Machine[];
  machineStatus: MachineStatus;
  pathList: PathType[];
  powerLine: ChartItem[];
  speedLine: ChartItem[];
  momentLine: ChartItem[];
}
