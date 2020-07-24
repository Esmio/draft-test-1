import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ControlBar from "@/components/ControlBar";
import SearchForm from '@/components/SearchForm';

interface Props {
  dispatch: Dispatch;
}

const BasicAuditType: React.FC<Props & StateType> = ({
  dispatch,
}) => {

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
            label: "姓名",
            name: 'name',
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
          {
            label: "所属部门/车间",
            name: 'department',
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
          name: 1,
          department: 1,
        }}
        onFinish={onSearch}
      />
    }
      control={
        <ControlBar
          onCreate={onCreate}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      }
    >
      <Table
        bordered
        size="small"
        pagination={false}
        columns={[
          {
            title: '姓名',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '职位',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '所属部门/车间',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '工序',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '层级',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'auditType',
            key: 'auditType',
            align: 'center',
          },
        ]}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        dataSource={[]}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    basicAuditType: {
    },
  }: {
    basicAuditType: StateType;
  }) => ({
  }),
)(BasicAuditType);
