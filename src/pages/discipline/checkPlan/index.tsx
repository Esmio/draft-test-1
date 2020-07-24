import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';

interface Props {
  dispatch: Dispatch;
}

const CheckPlan: React.FC<Props & StateType> = ({
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
      extra={<ExportButton />}
    >
      <Table
        bordered
        size="small"
        pagination={false}
        columns={[
          {
            title: '负责区域',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月1日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月2日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月3日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月4日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月5日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月6日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
          {
            title: '6月7日',
            dataIndex: 'dutyPosition',
            key: 'dutyPosition',
            align: 'center',
          },
        ]}
        dataSource={[]}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    checkPlan: {
    },
  }: {
    checkPlan: StateType;
  }) => ({
  }),
)(CheckPlan);
