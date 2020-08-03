import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  list
} from './service';

import { 
} from './data.d';

export interface StateType {
  loading: boolean;
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
    list: Effect;
    // fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'scoreDiagram',

  state: {
    loading: false,
    list: [],
  },

  effects: {
    *list({ payload }, { call, put }) {
      yield put({type: 'save', payload: { loading: true }})
      const res = yield call(list, payload);
      if(res.errCode === 0)
        yield put({type: 'save', payload: { list: res.data }})
      yield put({type: 'save', payload: { loading: false }})
    },
    // mock 数据
    *fetchFake(_, { call, put }) {
      const data = yield call(fetchFakeData);
      const { 
      } = data;
      yield put({
        type: 'save',
        payload: {
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
