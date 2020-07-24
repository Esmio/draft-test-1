import React, { useState, useEffect, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import SearchForm from '@/components/SearchForm';
import ExportButton from '@/components/ExportButton';

interface Props {
  dispatch: Dispatch;
}

const CheckBoard: React.FC<Props & StateType> = ({
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
      search={
        <SearchForm
          items={[
            {
              label: "问题编号",
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
            },
            {
              label: "检查人员",
              name: 'year',
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
        size="small"
        pagination={false}
        columns={[
          {
            title: '问题编号',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '问题描述',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '问题图片',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '问题点分类',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '扣分',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '状态',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '负责人',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '完成时间',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '对策措施',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '完成图片',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '区域',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '检查时间',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '检查人员',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
          },
          {
            title: '陪审员',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
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
    checkBoard: {
    },
  }: {
    checkBoard: StateType;
  }) => ({
  }),
)(CheckBoard);
