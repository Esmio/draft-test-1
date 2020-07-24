import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';

interface Props {
  dispatch: Dispatch;
}

const IssueList: React.FC<Props & StateType> = ({
  dispatch,
}) => {
  const [key, setKey] = useState('1');

  const handleTabChange = useCallback(
    (key) => {
      setKey(key);
    },
    [],
  )

  console.log('key', key);

  return (
    <Main
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
        columns={[
          {
            title: '问题编号',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '审核时间',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '区域',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '问题描述',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '问题图片',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '下次汇报时间',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '发起人',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
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
    issueList: {
    },
  }: {
    issueList: StateType;
  }) => ({
  }),
)(IssueList);
