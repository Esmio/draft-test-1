export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}

export interface PagiType {
  pageNum: string;
  pageSize: string;
}

export interface FailureDataType {
  x: string;
  y: number;
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

export interface AllType {
  list: FailureDataType[];
  warnLogList: WarnLog[];
}
