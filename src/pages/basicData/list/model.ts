import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { 
  fetchFakeData,
  queryAuditList,
} from './service';

import { 
} from './data.d';

export interface StateType {
  loading: boolean;
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
    queryAuditList: Effect;
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
  },

  effects: {
    *queryAuditList({ payload }, { call, put }) {
      const res = yield call(queryAuditList, payload);
      console.log('audit-list', res);
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
