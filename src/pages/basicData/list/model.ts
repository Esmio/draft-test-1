import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  list,
  create,
  update,
  remove,
  getTypeList,
  getProcess,
} from './service';
import { TypeListItem, PagiType, ProcessType } from './data.d';
import { TypeOptions } from '@/components/SearchForm';
import { message } from 'antd';

export interface StateType {
  loading: boolean;
  selectLoading: boolean;
  typeList: TypeOptions[];
  list: never[];
  pagination: PagiType;
  processList: TypeOptions[];
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
    list: Effect;
    create: Effect,
    update: Effect,
    remove: Effect,
    getTypeList: Effect;
    getProcess: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'basicList',

  state: {
    loading: false,
    selectLoading: false,
    list: [],
    typeList: [],
    pagination: {
      page: 1,
      size: 10
    },
    processList: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(list, payload);
      if(res.errCode === 0) {
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
      yield put({ type: 'save', payload: { loading: false }});
    },
    *create({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(create, payload);
      if(res.errCode === 0) {
        message.success('创建成功！');
        yield put({type: 'list', payload: {
          page: 1,
          size: 10,
        }});
        if(callback) callback();
      }
      yield put({ type: 'save', payload: { loading: false }});
    },
    *update({ payload, callback }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(update, payload);
      if(res.errCode === 0) {
        message.success('修改成功！')
        yield put({type: 'list', payload: {
          page: 1,
          size: 10,
        }});
        if(callback) callback();
      }
      yield put({ type: 'save', payload: { loading: false }});
    },
    *remove({ payload, callback }, { select, call, put }) {
      const { id, ...rest } = payload;
      yield put({ type: 'save', payload: { loading: false }});
      const res = yield call(remove, { id });
      if(res.errCode === 0) {
        message.success('已删除！')
        yield put({type: 'list', payload: {
          ...rest,
        }});
        if(callback) callback();
      }
      yield put({ type: 'save', payload: { loading: true }});

    },
    *getTypeList(_, { call, put }) {
      yield put({ type: 'save', payload: { selectLoading: true } });
      const res = yield call(getTypeList);
      if(res.errCode === 0)
        yield put({ 
          type: 'save',
          payload:
          { 
            typeList: res.data.map(({
              parentId: value,
              parentName: name
            }: TypeListItem) => ({
              name,
              value,
            }))
          }
        })
      yield put({ type: 'save', payload: { selectLoading: false } });
    },
    *getProcess(_, { call, put }) {
      const res = yield call(getProcess);
      if(res.errCode === 0)
        yield put({
          type: 'save',
          payload: {
            processList: res.data.map(({
              childId: value,
              childName: name
            }: ProcessType) => ({
              name,
              value,
            })) 
          }
        });
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
