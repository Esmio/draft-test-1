import { AllType } from './data.d';

const customerList = [
  {
    id: "1",
    name: "芜湖哈特机器人",
    logo: "",
    province: "安徽",
    city: "芜湖",
    orgId: "1",
  },
  {
    id: "2",
    name: "芜湖哈特机器人2222",
    logo: "",
    province: "安徽",
    city: "芜湖",
    orgId: "2",
  }
];

const machineList = [
  {
    id: '1',
    name: 'LGV1',
    status: -1,
    statusText: '离线',
  },
  {
    id: '2',
    name: 'LGV2',
    status: -1,
    statusText: '离线',
  },
  {
    id: '3',
    name: 'LGV3',
    status: -1,
    statusText: '离线',
  }
]

const lgvTime = {
  id: '10',
  lgvName: 'LGV2',
  epId: '2000000362',
  orgId: '2000000362210000099',
  mcheId: '',
  runtimeDuration: '3054.2666',
  freetimeDuration: '1925.4',
  chargetimeDuration: '500.0',
  warntimeDuration: '0.0',
  offlinetimeDuration: '0.0',
  startTime: '2020-04-22T00:00:00',
  endTime: '2020-04-22T00:00:00',
}

const oeeData = [
  {
    "lgvName": "aaa",
    "idleDuration": 0,
    "runDuration": 0,
    "chargeDuration": 0,
    "wrongDuration": 0,
    "dataDay": "2020-06-17"
  },
  {
    "lgvName": "bbb",
    "idleDuration": 10,
    "runDuration": 0,
    "chargeDuration": 30,
    "wrongDuration": 0,
    "dataDay": "2020-06-18"
  },
  {
    "lgvName": "ccc",
    "idleDuration": 20,
    "runDuration": 4,
    "chargeDuration": 0,
    "wrongDuration": 0,
    "dataDay": "2020-06-19"
  }
]

const getFakeData: AllType = {
  customerList,
  machineList,
  lgvTime,
  oeeData,
};

export default {
  'GET  /api/fake_truck_statistic_data': getFakeData,
};