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

const getFakeData: AllType = {
  customerList,
};

export default {
  'GET  /api/fake_truck_detection_data': getFakeData,
};