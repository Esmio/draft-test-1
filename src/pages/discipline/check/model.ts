import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  preCreate,
  create,
  list,
  update,
  remove,
  userList,
  fetchFakeData,
} from './service';

import {
  PagiType,
  PreCreateItem,
  UserItem,
} from './data.d';
import { TypeOption } from '@/components/CustomForm';
import { message } from 'antd';

export interface StateType {
  loading: boolean;
  list: never[];
  pagination: PagiType;
  preCreateObj: PreCreateItem | null;
  preCreateLoading: boolean;
  userList: TypeOption[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    preCreate: Effect;
    create: Effect;
    list: Effect;
    update: Effect;
    remove: Effect;
    userList: Effect;
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
    },
    preCreateObj: null,
    preCreateLoading: false,
    userList: [],
  },

  effects: {
    *preCreate({ payload, callback }, { call, put }) {
      yield put({type: 'save', payload: {preCreateLoading: true}});
      const preCreateRes = yield call(preCreate, payload);
      console.log('preCreateRes', preCreateRes);
      if (preCreateRes.errCode === 0 && !!preCreateRes.data) {
        yield put({
          type: 'save',
          payload: {
            preCreateObj: preCreateRes.data,
          }
        })
        if(callback) callback();
      } else {
        message.error('无法创建！')
      }
      yield put({type: 'save', payload: {preCreateLoading: false}});
    },
    *create({ payload }, { call, put }) {
      const { pagination, ...rest } = payload;
      const res = yield call(create, rest);
      if (res.errCode === 0) {
        message.success('创建成功！');
        yield put({ type: 'list', payload: { ...pagination } })
      }
    },
    *list({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true } })
      const res = yield call(list, payload);
      if (res.errCode === 0) {
        const { list, page, size, total } = res.data;
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
        });
      }
      yield put({ type: 'save', payload: { loading: false } })
    },
    *update() { },
    *remove() { },
    *userList(_, { call, put }) {
      const res = yield call(userList);
      if(res.errCode === 0) 
        yield put({
          type: 'save',
          payload: {
            userList: res.data.map(({
              id: value,
              realName: name
            }: UserItem) => ({
              name,
              value,
            }))
          }
        })
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
