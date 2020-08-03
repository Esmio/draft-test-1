import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import {
  create,
  userNameList,
  departmentList,
  fetchFakeData,
  processList,
  list,
  update,
  remove,
} from './service';
import {
  UserName,
  Department,
  ProcessType,
  PagiType,
} from './data.d';
import { TypeOption } from '@/components/SearchForm';

export interface StateType {
  loading: boolean;
  userNameList: TypeOption[];
  userNameListLoading: boolean;
  departmentList: TypeOption[];
  departmentListLoading: boolean;
  processList: TypeOption[];
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
    create: Effect,
    userNameList: Effect,
    departmentList: Effect,
    processList: Effect,
    list: Effect,
    update: Effect,
    remove: Effect,
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
    userNameList: [],
    userNameListLoading: false,
    departmentList: [],
    departmentListLoading: false,
    processList: [],
    list: [],
    pagination: {
      page: 1,
      size: 10,
    }
  },

  effects: {
    *create({ payload, callback }, { call, put }) {
      yield put({type: 'save', payload: { loading: true }});
      const res = yield call(create, payload);
      if(res.errCode === 0) {
        message.success('创建成功！');
        yield put({type: 'list', payload: { page: 1, size: 10 }});
        if(callback) callback();
      }
      yield put({type: 'save', payload: { loading: false }});
    },
    *list({ payload }, {call, put}) {
      yield put({type: 'save', payload: { loading: true }});
      const res = yield call(list, payload);
      if(res.errCode === 0 && res.data) {
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
        })
      }
      yield put({type: 'save', payload: { loading: false }});
    },
    *update({ payload, callback }, {call, put}) {
      yield put({type: 'save', payload: { loading: true }});
      const res = yield call(update, payload);
      if(res.errCode === 0) {
        message.success('修改成功！')
        yield put({ type: 'list', payload: {
          page: 1,
          size: 10,
        }})
        if(callback) callback();
      }
      yield put({type: 'save', payload: { loading: false }});
    },
    *remove({ payload, callback }, {call, put}) {
      const { userId: id, ...rest } = payload;
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(remove, { id });
      if(res.errCode === 0) {
        message.success('已删除！')
        yield put({type: 'list', payload: {
          ...rest,
        }});
        if(callback) callback();
      }
      yield put({ type: 'save', payload: { loading: false }});
    },
    *userNameList(_, { call, put }) {
      yield put({type: 'save', payload: { userNameListLoading: true }});
      const res = yield call(userNameList);
      if(res.errCode === 0)
        yield put({ type: 'save', payload: {
          userNameList: res.data.map(({id, realName}: UserName) => ({
            name: realName,
            value: id,
          }))
        }})
      yield put({type: 'save', payload: { userNameListLoading: false }});
    },
    // 获取部门列表
    *departmentList(_, {call, put}) {
      yield put({type: 'save', payload: { departmentListLoading: true }});
      const res = yield call(departmentList);
      if(res.errCode === 0)
        yield put({ type: 'save', payload: { 
          departmentList: res.data.map(({ parentId, parentName }: Department) => ({
            name: parentName,
            value: parentId,
          }))
        }})
      yield put({type: 'save', payload: { departmentListLoading: false }});
    },
    // 工序列表
    *processList(_, { call, put }) {
      const res = yield call(processList);
      if(res.errCode === 0)
        yield put({
          type: 'save',
          payload: {
            processList: res.data.map(({ childName, childId }: ProcessType) => ({
              name: childName,
              value: childId,
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
