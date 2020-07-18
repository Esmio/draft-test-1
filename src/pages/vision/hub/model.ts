import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  getCustomerList,
  getWheelInfo,
  getWheelList,
} from './service';

import { Customer } from './data.d';

export interface StateType {
  loading: boolean;
  customerList: Customer[];
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
    getWheelInfo: Effect;
    getWheelList: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'hub',

  state: {
    loading: false,
    customerList: [],
  },

  effects: {
    *getCustomerList({}, { call, put }) {
      const response = yield call(getCustomerList, { pageNum: 1, pageSize: 100, linkMan: '智研' });
    },
    *getWheelInfo({ payload }, { call, put }) {
      const res = yield call(getWheelInfo, payload);
    },
    *getWheelList({ payload }, { call, put }) {
      const res = yield call(getWheelList, payload);
    },
    // mock 数据
    *fetchFake({ payload }, { call, put }) {
      const data = yield call(fetchFakeData);
      const { 
        customerList,
      } = data;
      yield put({
        type: 'save',
        payload: {
          customerList,
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
