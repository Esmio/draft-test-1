import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import Search from '@/components/Search';
import ExportButton from '@/components/ExportButton';

interface Props {
  dispatch: Dispatch;
}

const Check: React.FC<Props & StateType> = ({
  dispatch,
}) => {

  const onChange = useCallback((e) => {
  }, [])

  const reset = useCallback(() => {
  }, [])

  const onSearch = useCallback(() => {
  }, [])

  return (
    <Main
      search={
        <Search
          value={''}
          onChange={onChange}
          reset={reset}
          onSearch={onSearch}
        />
      }
      extra={<ExportButton />}
    >
      <Table
        bordered
        size="small"
        pagination={false}
        columns={[]}
        dataSource={[]}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    check: {
    },
  }: {
    check: StateType;
  }) => ({
  }),
)(Check);
