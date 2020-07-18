import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { getTypeErrors, fakeChartData } from './service';

import { FailureDataType } from './data.d';

export interface StateType {
  loading: boolean;
  taskList: FailureDataType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchFake: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'information',

  state: {
    loading: false,
    taskList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getTypeErrors, payload);
      if (response.errCode === 0) {
        yield put({
          type: 'save',
          payload: {
            data: response.data,
          },
        });
      }
    },
    *fetchFake({ payload }, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          taskList: response.list,
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
