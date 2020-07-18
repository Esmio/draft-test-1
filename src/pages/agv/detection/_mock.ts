import { AllType } from './data.d';

const customerList = [
  {
    id: '1',
    name: '芜湖哈特机器人',
    logo: '',
    province: '安徽',
    city: '芜湖',
    orgId: '1',
  },
  {
    id: '2',
    name: '芜湖哈特机器人2222',
    logo: '',
    province: '安徽',
    city: '芜湖',
    orgId: '2',
  },
];

const agvInfoList = [
  {
    agvCurrentStationNum: '0',
    agvDirection: '0',
    agvDistance: '0',
    agvErrorMessage: '0',
    agvErrorMessageText: 'string',
    agvIpAddress: 'string',
    agvNum: '0',
    agvReceiveTime: '2020-04-26T11:56:54.636Z',
    agvSpeed: '0',
    agvState: '0',
    agvStateText: 'string',
    agvTargetStationNum: '0',
    agvVoltage: '0',
    epId: 'string',
    mcheId: 'string',
    orgId: 'string',
  },
];

const taskList = [
  {
    autoState: '0',
    deviceModel: '0',
    epId: 'string',
    id: '0',
    mcheId: 'string',
    orgId: 'string',
    startStation: '0',
    targetStation: '0',
    taskModel: '0',
    taskState: '0',
    updateTime: '2020-04-26T12:06:42.947Z',
  },
  {
    autoState: '0',
    deviceModel: '0',
    epId: 'string',
    id: '1',
    mcheId: 'string',
    orgId: 'string',
    startStation: '0',
    targetStation: '0',
    taskModel: '0',
    taskState: '0',
    updateTime: '2020-04-26T12:06:42.947Z',
  },
];

const getFakeData: AllType = {
  customerList,
  agvInfoList,
  taskList,
};

export default {
  'GET  /api/fake_agv_detection_data': getFakeData,
};
