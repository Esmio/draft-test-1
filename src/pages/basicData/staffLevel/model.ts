import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  create,
  fetchFakeData,
} from './service';

import { 
} from './data.d';
import { message } from 'antd';

export interface StateType {
  loading: boolean;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    create: Effect,
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'staffLevel',

  state: {
    loading: false,
  },

  effects: {
    *create({ payload }, { call, put }) {
      const res = yield call(create, payload);
      if(res.errCode === 0) {
        message.success('创建成功！')
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
