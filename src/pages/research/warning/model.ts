import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { ColumnsType } from 'antd/lib/table/Table';
import { fetchFakeData, getCustomerList, getDevelopmentStatistics, getWarnLogList } from './service';

import { Customer, ChartItem, WarnLogData } from './data.d';
import { convertWarLogList } from './utils/utils';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
  warnTypeList: ChartItem[];
  warnMachineList: ChartItem[];
  warnRobotList: ChartItem[];
  warnSensorList: ChartItem[];
  warnLogList: WarnLogData[];
  warnLogColumns: ColumnsType<WarnLogData>;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    // fetch: Effect;
    getCustomerList: Effect;
    getDevelopmentStatistics: Effect;
    getWarnLogList: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'devicesWarning',

  state: {
    loading: false,
    customerList: [],
    warnTypeList: [],
    warnMachineList: [],
    warnRobotList: [],
    warnSensorList: [],
    warnLogList: [],
    warnLogColumns: [],
  },

  effects: {
    *getCustomerList(_, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 100, linkMan: '智研' });
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          },
        });
      }
    },
    *getDevelopmentStatistics({ payload }, { call, put }) {
      const { type } = payload;
      const res = yield call(getDevelopmentStatistics, { type });
    },
    *getWarnLogList({ payload }, { call, put }) {
      const res = yield call(getWarnLogList, payload);
      if (res.errCode === 0) {
        const { warnLogList, warnLogColumns } = convertWarLogList(res.data.list);
        yield put({
          type: 'save',
          payload: {
            warnLogList,
            warnLogColumns,
          },
        });
      }
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      const {
        // customerList,
        warnTypeList,
        warnMachineList,
        warnRobotList,
        warnSensorList,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
          warnTypeList,
          warnMachineList,
          warnRobotList,
          warnSensorList,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
