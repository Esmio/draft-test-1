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

const lineList = [
  {
    time: "17:05:06",
    value: "0.2"
  },
  {
    time: "17:05:10",
    value: "0.4"
  },
  {
    time: "17:05:14",
    value: "0.6"
  },
  {
    time: "17:05:18",
    value: "0.8"
  },
  {
    time: "17:05:22",
    value: "0.6"
  },
  {
    time: "17:05:26",
    value: "0.8"
  },
  {
    time: "17:05:28",
    value: "0.6"
  },
  {
    time: "17:05:30",
    value: "0.8"
  }
]

const getFakeData: AllType = {
  customerList,
  warnTypeList: lineList,
  warnMachineList: lineList,
  warnRobotList: lineList,
  warnSensorList: lineList,
};

export default {
  'GET  /api/fake_device_warning_data': getFakeData,
};