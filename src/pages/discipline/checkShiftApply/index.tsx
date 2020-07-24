import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ControlBar from '@/components/ControlBar';

interface Props {
  dispatch: Dispatch;
}

const CheckShiftApply: React.FC<Props & StateType> = ({
  dispatch,
}) => {
  const [key, setKey] = useState('1');

  const onCreate = useCallback(() => {

  }, [])

  const onEdit = useCallback(() => {
  }, [])

  const onRemove = useCallback(() => {
  }, [])

  const handleTabChange = useCallback(
    (key) => {
      setKey(key);
    },
    [],
  )

  return (
    <Main
      control={<ControlBar
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
      />}
      tabList={[
        {
          key: '1',
          tab: '待处理'
        },
        {
          key: '2',
          tab: '待验证'
        },
        {
          key: '3',
          tab: '未通过'
        },
        {
          key: '4',
          tab: '已完成'
        },
      ]}
      onTabChange={handleTabChange}
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
    checkShiftApply: {
    },
  }: {
    checkShiftApply: StateType;
  }) => ({
  }),
)(CheckShiftApply);
