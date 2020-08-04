import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  list,
  departmentList,
  fetchFakeData,
} from './service';

import {
  Department
} from './data.d';
import { TypeOption } from '@/components/SearchForm';

export interface StateType {
  loading: boolean;
  list: never[];
  departmentList: TypeOption[];
  departmentListLoading: boolean;
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
    departmentList: Effect;
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'checkIssueAmount',

  state: {
    loading: false,
    list: [],
    departmentList: [],
    departmentListLoading: false,
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({type: 'save', payload: { loading: true }})
      const res = yield call(list, payload);
      console.log('res', res);
      if(res.errCode == 0)
        yield put({
          type: 'save',
          payload: {
            list: res.data,
          }
        })
      yield put({type: 'save', payload: { loading: false }})
    },
    *departmentList({ payload }, {call, put}) {
      yield put({type: 'save', payload: { departmentListLoading: true }})
      const res = yield call(departmentList, payload);
      if(res.errCode === 0)
        yield put({ type: 'save', payload: {
          departmentList: res.data.map(({
            parentId: value,
            parentName: name
          }: Department) => ({
            name,
            value,
          }))
        }})
      yield put({type: 'save', payload: { departmentListLoading: false }})
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
