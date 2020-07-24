import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ControlBar from '@/components/ControlBar';

interface Props {
  dispatch: Dispatch;
}

const Check: React.FC<Props & StateType> = ({
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

  // select rows
  const handleRowSelected: 
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined = 
    (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectedRows', selectedRows)
    }

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
          tab: '待提交'
        },
        {
          key: '2',
          tab: '待审核'
        },
        {
          key: '3',
          tab: '未通过'
        },
        {
          key: '4',
          tab: '待处理'
        },
        {
          key: '5',
          tab: '待验证'
        },
        {
          key: '6',
          tab: '已完成'
        },
      ]}
      onTabChange={handleTabChange}
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
            title: '问题类别',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '问题描述',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '问题图片',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '问题严重程度',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '扣分',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '负责人',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '区域',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '检查时间',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '检查人员',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
          },
          {
            title: '陪审员',
            dataIndex: 'issueType',
            align: 'center',
            key: 'issueType',
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
    check: {
    },
  }: {
    check: StateType;
  }) => ({
  }),
)(Check);
