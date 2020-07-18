import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  getCustomerList,
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
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'agvPanaroma',

  state: {
    loading: false,
    customerList: [],
  },

  effects: {
    *getCustomerList({}, { call, put }) {
      const res = yield call(getCustomerList, { pageNum: 1, pageSize: 100, linkMan: '智慧' });
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            customerList: res.data.list,
          }
        })
      }
    },
    // mock 数据
    *fetchFake({ payload }, { call, put }) {
      const data = yield call(fetchFakeData);
      const { 
        // customerList,
      } = data;
      yield put({
        type: 'save',
        payload: {
          // customerList,
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
