import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import { UserItem } from './data.d';
import Main from '@/components/MainContainer';
import SearchForm from '@/components/SearchForm';
import ExportButton from '@/components/ExportButton';

interface Props {
  dispatch: Dispatch;
}

const CheckBoard: React.FC<Props & StateType> = ({
  dispatch,
  pagination,
  list,
  loading,
}) => {

  useEffect(() => {
    dispatch({
      type: 'checkBoard/list',
      payload: {
        page: 1,
        size: 10,
        status: 'discipline_start',
      }
    })
  }, [])

  // const onChange = useCallback((e) => {
  // }, [])

  // const reset = useCallback(() => {
  // }, [])

  const onSearch = useCallback(() => {
  }, [])
  // 分页
  const handlePageChange = useCallback(
    (page, size) => {
      dispatch({
        type: 'checkBoard/list',
        payload: {
          page,
          size,
          status: 'discipline_start',
        }
      })
    },
    [pagination],
  )

  return (
    <Main
      search={
        <SearchForm
          items={[
            // {
            //   label: "问题编号",
            //   name: 'department',
            //   type: 'select',
            //   typeOptions: [
            //     {
            //       name: 'value1',
            //       value: 1,
            //     },
            //     {
            //       name: 'value2',
            //       value: 2,
            //     },
            //     {
            //       name: 'value3',
            //       value: 3,
            //     },
            //     {
            //       name: 'value4',
            //       value: 4,
            //     }
            //   ],
            // },
            // {
            //   label: "检查人员",
            //   name: 'year',
            //   type: 'select',
            //   typeOptions: [
            //     {
            //       name: 'value1',
            //       value: 1,
            //     },
            //     {
            //       name: 'value2',
            //       value: 2,
            //     },
            //     {
            //       name: 'value3',
            //       value: 3,
            //     },
            //     {
            //       name: 'value4',
            //       value: 4,
            //     }
            //   ],
            // }
          ]}
          initialValues={{
            department: 1,
            year: 1
          }}
          onFinish={onSearch}
        />
      }
      extra={<ExportButton />}
    >
      <Table
        bordered
        loading={loading}
        size="small"
        pagination={{
          pageSize: pagination.size,
          current: pagination.page,
          total: pagination.total,
          onChange: handlePageChange
        }}
        columns={[
          {
            title: '问题编号',
            dataIndex: 'no',
            key: 'no',
          },
          {
            title: '问题描述',
            dataIndex: 'problemDesc',
            key: 'problemDesc',
          },
          {
            title: '问题图片',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: url => (<img src={url} width="100" />),
          },
          {
            title: '问题点分类',
            dataIndex: 'categoryName',
            key: 'categoryName',
          },
          {
            title: '扣分',
            dataIndex: 'fraction',
            key: 'fraction',
          },
          {
            title: '状态',
            dataIndex: 'lookStatus',
            key: 'lookStatus',
          },
          {
            title: '负责人',
            dataIndex: 'responsibleName',
            key: 'responsibleName',
          },
          {
            title: '完成时间',
            dataIndex: 'finishTime',
            key: 'finishTime',
          },
          {
            title: '对策措施',
            dataIndex: 'step',
            key: 'step',
          },
          {
            title: '完成图片',
            dataIndex: 'dealWithImage',
            key: 'dealWithImage',
            render: url => (<img src={url} width="100" />),
          },
          {
            title: '区域',
            dataIndex: 'departmentName',
            key: 'departmentName',
          },
          {
            title: '检查时间',
            dataIndex: 'planDate',
            key: 'planDate',
          },
          {
            title: '检查人员',
            dataIndex: 'qualityUserName',
            key: 'qualityUserName',
            render: (name, { produceUserName }) => `${name}, ${produceUserName}`
          },
          {
            title: '陪审员',
            dataIndex: 'processProblemUserDtoList',
            key: 'processProblemUserDtoList',
            render: arr => arr?.map(({userName}: UserItem) => userName).join(', ')
          },
        ]}
        dataSource={list}
        rowKey={({ id }) => id}
      />
    </Main>
  );
};

export default connect(
  ({
    checkBoard: {
      loading,
      list,
      pagination,
    },
  }: {
    checkBoard: StateType;
  }) => ({
    loading,
    list,
    pagination,
  }),
)(CheckBoard);
