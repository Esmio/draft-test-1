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

const machineList = [
  {
    id: '1',
    name: '设备111111',
    machineImage: '',
    status: 0,
    statusText: '',
  },
  {
    id: '2',
    name: '设备222222',
    machineImage: '',
    status: 1,
    statusText: '',
  },
];

const machineStatus = {
  machineId: '1',
  machine: '2',
  x: '10.0',
  y: '20.0',
  z: '30.0',
  rx: '40.0',
  ry: '20.0',
  rz: '30.0',
  speed: '',
  power: '',
  moment: '0.3',
};

let pathList = [];
for (let i = 1; i <= 3; i++) {
  let obj = {
    order: i,
    x: '0',
    y: '0',
    z: '0',
    q0: '0',
    q1: '0',
    q2: '0',
    q3: '0',
  };
  for (let j = 1; j <= 7; j++) {
    j <= 3
      ? (obj[['', 'x', 'y', 'z'][j]] = (j * 10).toFixed(1))
      : (obj[`q${j - 4}`] = (j * 10).toFixed(1));
  }
  pathList.push(obj);
}

const lineList = [
  {
    time: '17:05:06',
    value: '0.2',
  },
  {
    time: '17:05:10',
    value: '0.4',
  },
  {
    time: '17:05:14',
    value: '0.6',
  },
  {
    time: '17:05:18',
    value: '0.8',
  },
  {
    time: '17:05:22',
    value: '0.6',
  },
  {
    time: '17:05:26',
    value: '0.8',
  },
  {
    time: '17:05:28',
    value: '0.6',
  },
  {
    time: '17:05:30',
    value: '0.8',
  },
];

const getFakeData: AllType = {
  customerList,
  machineList,
  machineStatus,
  pathList,
  powerLine: lineList,
  speedLine: lineList,
  momentLine: lineList,
};

export default {
  'GET  /api/fake_data': getFakeData,
};
