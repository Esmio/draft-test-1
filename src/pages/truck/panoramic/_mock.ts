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

const sites = [
  {
    name: '站点1',
    acsname: 'acs1',
    nature: 0,
    positionX: '33',
    positionY: '33',
    type: 'PO',
  },
  {
    name: '站点2',
    acsname: 'acs2',
    nature: 0,
    positionX: '53',
    positionY: '63',
    type: 'PO',
  },
]


const getFakeData: AllType = {
  customerList,
  sites,
};

export default {
  'GET  /api/fake_panaroma_data': getFakeData,
};