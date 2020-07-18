export interface DateRangeQuery {
  startDate: string;
  endDate: string;
  [index: string]: string;
}
// 分页
export type PagiType = {
  pageNum: number;
  pageSize: number;
  total?: number;
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
// 基本信息
export interface BaseInfo {
  forklist: number;
  deliveryPoint: number;
  chargePoint: number;
  pickPoint: number;
  pathPoint: number;
  goodsPoint: number;
  tmpPoint: number;
  waitPoint: number;
}
// 小车列表
export interface MachineType {
  id: string;
  name: string;
  status: number;
  statusText: string;
  battery: string;
}
// 站点列表 | Route
export interface Site {
  acsname: string;
  name: string;
  nature?: number;
  positionX: string;
  positionY: string;
  type: string;
}
// 路径列表
export interface Route {
  action: string;
  name: string;
  positions: Site[];
}
// 轨迹显示
export interface LgvType {
  id: number;
  lgvAction: number;
  lgvIpAddress: string;
  lgvLoad: number;
  lgvLoading: number;
  lgvMaxSpeed: number;
  lgvType: number;
  lgvUnloadSpeed: number;
  name: string;
  routesPath: Route[];
  status: number;
  statusText: string;
}
// 实时检测  扩展LgvType？
export interface RealTime {
  angle: string;
  id: number;
  lgvAction: number;
  lgvEndSite: string;
  lgvIpAddress: string;
  lgvLoad: number;
  lgvLoading: number;
  lgvMaxSpeed: number;
  lgvPath: string;
  lgvStartSite: string;
  lgvStatus: number;
  lgvTaskName: string;
  lgvType: number;
  lgvUnloadSpeed: number;
  name: string;
  positionX: string;
  positionY: string;
  receiveTime: string;
  routesPath: RoutesPath[];
  status: number;
  statusText: string;
  time: string;
}
// mock
export interface AllType {
  customerList: Customer[];
  sites: Site[];
}
