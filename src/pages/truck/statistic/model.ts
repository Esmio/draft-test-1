import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fetchFakeData, getCustomerList, getMachineList, getLgvTime, getOee } from './service';

import { Customer, MachineType, LGVTimeType, OeeType } from './data.d';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
  machineList: MachineType[];
  lgvTime: LGVTimeType[];
  oeeData: OeeType[];
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
    getLgvTime: Effect;
    fetchFake: Effect;
    getOee: Effect;
    getMachineList: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'truckStatistic',

  state: {
    loading: false,
    customerList: [],
    machineList: [],
    lgvTime: [],
    oeeData: [],
  },

  effects: {
    *getCustomerList(_, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 10, linkMan: '叉车' });
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          },
        });
      }
    },
    *getMachineList({ payload }, { call, put }) {
      const res = yield call(getMachineList, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            machineList: res.data.list,
          },
        });
      }
    },
    // lgv
    *getLgvTime({ payload }, { call, put }) {
      const res = yield call(getLgvTime, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            lgvTime: res.data,
          },
        });
      }
    },
    *getOee({ payload }, { call, put }) {
      const res = yield call(getOee, payload);
      if (res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            oeeData: res.data,
          },
        })
      }
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      // eslint-disable-next-line no-empty-pattern
      const {
        // customerList,
        // machineList,
        // lgvTime,
        // oeeData,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
          // machineList,
          // lgvTime,
          // oeeData,
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
