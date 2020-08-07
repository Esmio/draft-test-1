import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  list,
  fetchFakeData,
} from './service';

import {
  PagiType,
} from './data.d';

export interface StateType {
  loading: boolean;
  list: never[];
  pagination: PagiType;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    list: Effect;
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'checkBoard',

  state: {
    loading: false,
    list: [],
    pagination: {
      page: 1,
      size: 10,
      total: 0,
    }
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {loading: true} });
      const res = yield call(list, payload);
      if (res.errCode === 0) {
        const {list, page, size, total} = res.data;
        yield put({
          type: 'save',
          payload: {
            list,
            pagination: {
              page,
              size,
              total,
            }
          }
        })
      }
      yield put({ type: 'save', payload: {loading: false} });
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
