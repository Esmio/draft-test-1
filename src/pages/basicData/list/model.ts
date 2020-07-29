import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  list,
  getTypeList,
} from './service';
import { TypeListItem } from './data.d';
import { TypeOptions } from '@/components/SearchForm';

export interface StateType {
  loading: boolean;
  selectLoading: boolean;
  typeList: TypeOptions[];
  list: never[];
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
    getTypeList: Effect;
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
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { loading: true }});
      const res = yield call(list, payload);
      if(res.errCode === 0) 
        yield put({ type: 'save', payload: { list: res.data.list } });
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
