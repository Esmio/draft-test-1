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

const taskList = [
  {
    id: '1',
    name: '任务1',
    machineId: 'mm1',
    machine: 'mmm1',
    startSite: '1',
    startAction: 'xxx',
    targetSite: '1',
    targetAction: 'yyy',
    taskStatus: 'dddd',
    taskTime: '2020-06-10',
  },
  {
    id: '2',
    name: '任务2',
    machineId: 'mm2',
    machine: 'mmm2',
    startSite: '2',
    startAction: 'xxx',
    targetSite: '2',
    targetAction: 'yyy',
    taskStatus: 'dddd',
    taskTime: '2020-06-10',
  },
]

const getFakeData: AllType = {
  customerList,
  taskList,

};

export default {
  'GET  /api/fake_truck_detection_data': getFakeData,
};