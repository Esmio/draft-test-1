import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  list,
  create,
  update,
  remove,
  check,
  commit,
  auth,
  fetchFakeData,
} from './service';

import {
  PagiType,
  ValidateType,
} from './data.d';
import { message } from 'antd';

export interface StateType {
  checkShiftApply?: any
  loading: boolean;
  list: never[];
  pagination: PagiType;
  validate: {[key: string]: ValidateType};
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
    create: Effect;
    update: Effect;
    remove: Effect;
    check: Effect;
    commit: Effect;
    auth: Effect;
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'shiftApply',

  state: {
    loading: false,
    list: [],
    pagination: {
      page: 1,
      size: 10,
      total: 0
    },
    validate: {
      originalDate: {
        status: "",
        msg: "",
      },
      currDate: {
        status: "",
        msg: "",
      }
    },
  },

  effects: {
    *list({payload}, {call, put}){
      yield put({type: 'save', payload: {loading: true}});
      const res = yield call(list, payload);
      if(res.errCode === 0) {
        const { list, page, size, total } = res.data;
        yield put({type: 'save', payload: {
          list,
          pagination: {
            page,
            size,
            total,
          }
        }});
      }
      yield put({type: 'save', payload: {loading: false}});
    },
    *create({payload, callback, listQuery}, { call, put }){
      const res = yield call(create, payload);
      if(res.errCode === 0) {
        message.success('创建成功！');
        if(callback) callback();
        yield put({type: 'list', payload: listQuery});
      }
    },
    *update({payload, callback, listQuery}, {call, put}){
      const res = yield call(update, payload);
      if(res.errCode === 0) {
        message.success('修改成功！');
        if(callback) callback();
        yield put({ type: 'list', payload: listQuery })
      }
    },
    *remove({ payload, callback, listQuery }, { call, put }){
      const res = yield call(remove, payload);
      if(res.errCode === 0) {
        message.success('已删除！');
        if(callback) callback();
        yield put({ type: 'list', payload: listQuery });
      }
    },
    *check({ payload }, { call, put, select }) {
      const validateMap = {
        'originalDate': true,
        'currDate': false,
      }
      const {key, ...rest} = payload;
      const res = yield call(check, rest);
      if(res.errCode === 0) {
        const validate = yield select(({checkShiftApply}) => checkShiftApply.validate);
        if(res.data.taskFlag !== undefined && validateMap[key] === res.data.taskFlag) {
          yield put({
            type: 'save',
            payload: {
              validate: {
                ...validate,
                [key]: {
                  status: 'success',
                  msg: undefined,
                },
              }
            }
          })
        } else {
          yield put({
            type: 'save',
            payload: {
              validate: {
                ...validate,
                [key]: {
                  status: 'error',
                  msg: '校验不通过！',
                },
              }
            }
          })
        }
      }else {
        console.log('check-res-error', res);
        message.error('服务可能有点问题，无法提交');
      }
    },
    *commit({ payload, listQuery }, { call, put }) {
      const res = yield call(commit, payload);
      if(res.errCode === 0) {
        message.success('提交成功！');
        yield put({type: 'list', payload: listQuery});
      }
    },
    *auth({ payload, callback, listQuery }, { call, put }) {
      const res = yield call(auth, payload);
      if(res.errCode === 0) {
        message.success('审核成功！');
        if(callback) callback();
        yield put({ type: 'list', payload: listQuery });
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
