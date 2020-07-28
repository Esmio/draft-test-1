import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';

import { 
  fetchFakeData,
  getAuditTypeList,
  creatAuditType,
  updateAuditType,
  deleteAuditType,
} from './service';
import {
} from './data.d';
import { EffectCallback } from 'react';

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
    updateAuditType: Effect,
    deleteAuditType: Effect,
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
    // 列表
    *getAuditTypeList(_, {call, put}) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(getAuditTypeList);
      if(res.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            list: res.data,
          }
        })
      }
      yield put({ type: 'save', payload: { loading: false }});
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
    // 编辑
    *updateAuditType({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      const res = yield call(updateAuditType, payload);
      if(res.errCode === 0) {
        message.success('修改成功！');
        if(callback) callback();
      }
      yield put({ type: 'getAuditTypeList' });
      yield put({ type: 'save', payload: { loading: false } });
    },
    // 删除
    *deleteAuditType({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } });
      const res = yield call(deleteAuditType, payload);
      if(res.errCode === 0) {
        message.success('已删除');
        if(callback) callback();
      }
      yield put({ type: 'getAuditTypeList' });
      yield put({ type: 'save', payload: { loading: false } });
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
