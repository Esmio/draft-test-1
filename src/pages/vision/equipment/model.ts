import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  getCustomerList,
  getLibraryInfo,
  getConfigInfo,
  getImageInfo,
  getLoggingInfo,
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
    getLibraryInfo: Effect;
    getConfigInfo: Effect;
    getImageInfo: Effect;
    getLoggingInfo: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'equipment',

  state: {
    loading: false,
    customerList: [],
  },

  effects: {
    *getCustomerList({}, { call, put }) {
      const response = yield call(getCustomerList, { pageNum: 1, pageSize: 100, linkMan: '智研' });
    },
    *getLibraryInfo({ payload }, { call, put }) {
      const res = yield call(getLibraryInfo, payload);
    },
    *getConfigInfo({ payload }, {call, put}) {
      const res = yield call(getConfigInfo, payload);
    },
    *getImageInfo({ payload }, { call, put }) {
      const res = yield call(getImageInfo, payload);
    },
    *getLoggingInfo({ payload }, { call, put }) {
      const res = yield call(getLoggingInfo, payload);
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
