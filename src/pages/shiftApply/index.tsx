import React, { useState, useEffect, useCallback, useRef, ReactText } from 'react'
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ControlBar from './components/ControlBar';
import Search from './components/Search';

// import styles from './style.less'

interface Props {
  dispatch: Dispatch;
}

const ShiftApply: React.FC<Props & StateType> = ({
  dispatch,
}) => {
  const [ flowStatus, setFlowStatus ] = useState<string>('0')
  const onCreate = useCallback(() => {

  }, [])

  const onEdit = useCallback(() => {
  }, [])

  const onRemove = useCallback(() => {
  }, [])

  const onChange = useCallback((value) => {
    console.log('change-value', value);
    setFlowStatus(value);
  }, []);

  // select rows
  const handleRowSelected: 
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined = 
    (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectedRows', selectedRows)
    }

  return (
    <Main
      search={
        <Search
          value={flowStatus}
          onChange={onChange}
        />
      }
      control={<ControlBar
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
      />}
    >
      <Table
        bordered
        size="small"
        pagination={false}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        columns={[
          {
            title: '排版工序',
            dataIndex: 'processName',
            key: 'processName',
            align: 'center',
          },
          {
            title: '原排班日期',
            dataIndex: 'originalDate',
            key: 'originalDate',
            align: 'center',
          },
          {
            title: '现排班日期',
            dataIndex: 'currDate',
            align: 'center',
            key: 'currDate'
          },
          {
            title: '申请人',
            dataIndex: 'createUserName',
            align: 'center',
            key: 'createUserName'
          },
          {
            title: '申请时间',
            dataIndex: 'createAt',
            align: 'center',
            key: 'createAt'
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
    shiftApply: {
    },
  }: {
    shiftApply: StateType;
  }) => ({
  }),
)(ShiftApply);
