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
// 表格
export interface ChartItem {
  time: string;
  value: string;
}
// 告警列表
export interface WarnLog {
  header: WarnLogHeaderType,
  body: WarnLogBodyType[],
}

export interface WarnLogHeaderType {
  theme: string;
  name: string;
  align: string,
}

export interface WarnLogBodyType {
  label: string;
  name: string;
  value: string;
}

export interface WarnLogData {
  machine: string;
  text?: string;
  taskName?: string;
  posx?: string;
  posy?: string;
  angle?: string;
  timeNow?: string;
  time?: string;
  continueTime?: string;
}

export interface Column {
  title: string;
  dataIndex: string;
  key: string;
  align?: string;
}

// mock
export interface AllType {
  customerList: Customer[];
  warnTypeList: ChartItem[];
  warnMachineList: ChartItem[];
  warnRobotList: ChartItem[];
  warnSensorList: ChartItem[];
}
