import React, { useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ExportButton from '@/components/ExportButton';
import SearchForm from '@/components/SearchForm';

interface Props {
  dispatch: Dispatch;
}

const IssueBoard: React.FC<Props & StateType> = ({
  dispatch,
}) => {

  const onChange = useCallback((e) => {
  }, [])

  const reset = useCallback(() => {
  }, [])

  const onSearch = useCallback(() => {
  }, [])

  const onRemove = useCallback(
    () => {
      console.log('remove');
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
      search={
        <SearchForm
          items={[
            {
              label: "地点",
              name: 'position',
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
              label: "问题编号",
              name: 'issueNumber',
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
            issueNumber: 1,
            position: 1,
          }}
          onFinish={onSearch}
        />
      }
      control={
        <Button
          onClick={onRemove}
          icon={<DeleteOutlined />}
        >删除</Button>
      }
      extra={<ExportButton />}
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
            title: '状态',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '负责人',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '要因分析',
            dataIndex: 'issueNumber',
            key: 'issueNumber',
            align: 'center',
          },
          {
            title: '对策措施',
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
        ]}
        dataSource={[]}
        rowKey={({ processId }) => processId}
      />
    </Main>
  );
};

export default connect(
  ({
    issueBoard: {
    },
  }: {
    issueBoard: StateType;
  }) => ({
  }),
)(IssueBoard);
