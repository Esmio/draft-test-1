import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fetchFakeData, getCustomerList, getAGVInfo, getChargingTime } from './service';

import { Customer, AGVInfoType, TaskType } from './data.d';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
  agvInfoList: AGVInfoType[];
  taskList: TaskType[];
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
    getAGVInfo: Effect;
    getChargingTime: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'agvDetection',

  state: {
    loading: false,
    customerList: [],
    agvInfoList: [],
    taskList: [],
  },

  effects: {
    *getCustomerList(_, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 100, linkMan: '智慧' });
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          },
        });
      }
    },
    *getAGVInfo({ payload }, { call, put }) {
      const res = yield call(getAGVInfo, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            agvInfoList: res.data.list,
          },
        });
      }
    },
    // 充电时间
    *getChargingTime({ payload }, { call }) {
      const res = yield call(getChargingTime, payload);
      console.log('getChargingTime', res);
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      // eslint-disable-next-line no-empty-pattern
      const {
        // customerList,
        // agvInfoList,
        taskList,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
          // agvInfoList,
          taskList,
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
