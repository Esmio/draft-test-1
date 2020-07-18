import { AllType } from './data.d';

const list = [];
for (let i = 0; i < 12; i += 1) {
  list.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const getFakeChartData: AllType = {
  list,
};

export default {
  'GET  /api/fake_failure_chart_data': getFakeChartData,
};