import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  preCreate,
  create,
  list,
  update,
  remove,
  fetchFakeData,
} from './service';

import {
  PagiType,
} from './data.d';
import { message } from 'antd';

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
    create: Effect;
    list: Effect;
    update: Effect;
    remove: Effect;
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'check',

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
    *create({ payload }, { call, put }) {
      const preCreateRes = yield call(preCreate, payload);
      console.log('preCreateRes', preCreateRes);
      if(preCreateRes.errCode === 0 && !!preCreateRes.data) {
        const { pagination, ...rest } = payload
        const res = yield call(create, rest);
        if(res.errCode === 0) {
          message.success('创建成功！');
          yield put({type: 'list', payload: { ...pagination }})
        }
      }
    },
    *list({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } })
      const res = yield call(list, payload);
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          list: res.data.list,
        })
      }
      yield put({ type: 'save', payload: { loading: false } })
    },
    *update() {},
    *remove() {},
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
