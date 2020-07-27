import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';

import { 
  fetchFakeData,
  getAuditTypeList,
  creatAuditType,
} from './service';
import {
} from './data.d';

export interface StateType {
  loading: boolean;
  list: never[] | undefined;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getAuditTypeList: Effect,
    creatAuditType: Effect,
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'basicAuditType',

  state: {
    loading: false,
    list: [],
  },

  effects: {
    *getAuditTypeList(_, {call, put}) {
      yield put({
        type: 'save',
        payload: {
          loading: true,
        }
      })
      const res = yield call(getAuditTypeList);
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            list: res.data,
          }
        })
      }
      yield put({
        type: 'save',
        payload: {
          loading: false,
        }
      })
    },
    // 创建
    *creatAuditType({ payload, callback }, { call, put }) {
      const res = yield call(creatAuditType, payload);
      if(res.errCode === 0) {
        message.success('创建成功!');
        yield put({
          type: 'getAuditTypeList',
        })
      }
      if(callback) callback();
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
