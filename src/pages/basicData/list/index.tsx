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
  loading,
  selectLoading,
  list,
  typeList,
}) => {

  useEffect(() => {
    dispatch({
      type: 'basicList/list',
      payload: {
        page: 1,
        size: 10
      }
    })
    dispatch({type: 'basicList/getTypeList'})
  }, [])
  
  console.log('typeList', typeList);
  console.log('selectLoading', selectLoading);
  console.log('list', list);
  console.log('typeList[0]?.value', typeList[0]?.value);

  const onCreate = useCallback(() => {
  }, [])

  const onEdit = useCallback(() => {
  }, [])

  const onRemove = useCallback(() => {
  }, [])

  const onSearch = useCallback((values) => {
    console.log('values', values);
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
              name: 'auditCategoryId',
              type: 'select',
              loading: selectLoading,
              typeOptions: typeList,
            },
          ]}
          initialValues={{
            auditCategoryId: typeList[0]?.value,
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
            dataIndex: 'auditCategoryName',
            key: 'auditCategoryName',
            align: 'center',
          },
          {
            title: '编号',
            dataIndex: 'no',
            key: 'no',
            align: 'center',
          },
          {
            title: '审核内容',
            dataIndex: 'auditComment',
            key: 'auditComment',
            align: 'center',
          },
          {
            title: '适用层级',
            dataIndex: 'useLevel',
            key: 'useLevel',
            align: 'center',
          },
          {
            title: '适用工序',
            dataIndex: 'processCategoryDtoList.processName',
            key: 'processCategoryDtoList.processName',
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
          }
        ]}
        dataSource={list}
        rowKey={({ id }) => id}
      />
    </Main>
  );
};

export default connect(
  ({
    basicList: {
      loading,
      selectLoading,
      list,
      typeList,
    },
  }: {
    basicList: StateType;
  }) => ({
    loading,
    selectLoading,
    list,
    typeList,
  }),
)(BasicList);
