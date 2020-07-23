import React, { useCallback } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Button } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import SearchForm from '@/components/SearchForm';

interface Props {
  dispatch: Dispatch;
}

const List: React.FC<Props & StateType> = ({
  dispatch,
}) => {

  const onSearch = useCallback((values) => {
    console.log('onSearch:onFinish', values)
  }, [])

  return (
    <Main
      search={
        <SearchForm
          items={[
            {
              label: "审核时间",
              name: 'auditTime',
              type: 'input',
            },
            {
              label: "审核范围",
              name: 'auditScope',
              type: 'select',
              typeOptions: [
                {
                  name: 'value1',
                  value: 1,
                },
                {
                  name: 'value2',
                  value: 2,
                },
                {
                  name: 'value3',
                  value: 3,
                },
                {
                  name: 'value4',
                  value: 4,
                }
              ],
            }
          ]}
          initialValues={{
            auditScope: 1
          }}
          onFinish={onSearch}
        />
      }
      control={<Button type="primary">今日审核</Button>}
    >
      <Table
        bordered
        size="small"
        pagination={false}
        columns={[
          {
            title: '审核时间',
            dataIndex: 'auditTime',
            key: 'auditTime',
            align: 'center',
          },
          {
            title: '审核范围',
            dataIndex: 'auditScope',
            key: 'auditScope',
            align: 'center',
          },
          {
            title: '审核人',
            dataIndex: 'createUser',
            key: 'createUser',
            align: 'center',
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
          }
        ]}
        dataSource={[]}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    list: {
    },
  }: {
    list: StateType;
  }) => ({
  }),
)(List);
