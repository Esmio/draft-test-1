import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import SearchForm from '@/components/SearchForm';
import ControlBar from '@/components/ControlBar';

interface Props {
  dispatch: Dispatch;
}

const BasicList: React.FC<Props & StateType> = ({
  dispatch,
}) => {

  useEffect(() => {
    dispatch({
      type: 'basicList/queryAuditList',
      payload: {
        page: 1,
        size: 10
      }
    })
  }, [])

  const onCreate = useCallback(() => {
  }, [])

  const onEdit = useCallback(() => {
  }, [])

  const onRemove = useCallback(() => {
  }, [])

  const onSearch = useCallback(() => {
  }, [])

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
        <SearchForm
          items={[
            {
              label: "审核类别",
              name: 'auditType',
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
            },
          ]}
          initialValues={{
            auditType: 1,
          }}
          onFinish={onSearch}
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
            title: '审核类别',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '编号',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '审核内容',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '适用层级',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '适用工序',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'auditType',
            key: 'auditType',
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
    basicList: {
    },
  }: {
    basicList: StateType;
  }) => ({
  }),
)(BasicList);
