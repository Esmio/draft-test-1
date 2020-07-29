import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';

import { 
  fetchFakeData,
  create,
  remove,
  update,
  list,
} from './service';
import { 
} from './data.d';
import { message } from 'antd';

export interface StateType {
  loading: boolean;
  list: never[],
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
    fetchFake: Effect;
    create: Effect;
    remove: Effect;
    update: Effect;
    list: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'issueBasicType',

  state: {
    loading: false,
    list: [],
  },

  effects: {
    *create({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(create, payload);
      if(res.errCode === 0) {
        message.success('创建成功！');
        yield put({type: 'list'})
        if(callback) callback();
      }
      yield put({ type: 'save', payload: { loading: false }});
    },
    *remove({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(remove, payload);
      if(res.errCode === 0) {
        message.success('已删除！');
        if(callback) callback();
        yield put({ type: 'list' });
      }
      yield put({ type: 'save', payload: { loading: false }});
    },
    *update({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(update, payload);
      if(res.errCode === 0) {
        message.success('修改成功！');
        yield put({ type: 'list' });
        if(callback) callback();
      }
      yield put({ type: 'save', payload: { loading: false }});
    },
    *list(_, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(list);
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
