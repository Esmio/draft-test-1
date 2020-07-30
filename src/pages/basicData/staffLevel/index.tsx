import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import Main from '@/components/MainContainer';
import ControlBar from "@/components/ControlBar";
import SearchForm from '@/components/SearchForm';
import CustomForm from '@/components/CustomForm';

interface Props {
  dispatch: Dispatch;
}

const BasicAuditType: React.FC<Props & StateType> = ({
  dispatch,
  loading,
}) => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // 增
  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible]);
  // 改
  const onEdit = useCallback(() => {
    setEditModalVisible(true);
  }, [editModalVisible]);

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

  // 创建弹框提交
  const handleCreateOk = useCallback((values) => {
    dispatch({
      type: 'staffLevel/create',
      payload: {...values, useLevel: values.useLevel.join(',')},
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])

  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])

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
      <Modal
        visible={createModalVisible}
        title="新增审核内容"
        onCancel={handleCreateCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "姓名",
              name: 'userName',
              type: 'select',
              typeOptions: [],
              rules: [
                {
                  required: true,
                  message: '请选择员工'
                }
              ]
            },
            {
              label: '职位',
              name: 'jobLevel',
              type: 'select',
              typeOptions: [],
              rules: [
                {
                  required: true,
                  message: '请选择职位'
                }
              ]
            },
            {
              label: '所属部门/车间',
              name: 'departmentId',
              type: 'select',
              typeOptions: [],
              rules: [
                {
                  required: true,
                  message: '青选择部门/车间'
                }
              ]
            },
            {
              label: '工序',
              name: 'processIds',
              type: 'select',
              typeOptions: [],
              mode: 'multiple',
              rules: [
                {
                  required: true,
                  message: '请选择工序'
                }
              ]
            },
            {
              label: '层级',
              name: 'useLevel',
              type: 'select',
              typeOptions: [
                {
                  name: 'L1',
                  value: 'L1',
                },
                {
                  name: 'L2',
                  value: 'L2',
                },
                {
                  name: 'L3',
                  value: 'L3',
                },
              ],
              mode: 'multiple',
              rules: [
                {
                  required: true,
                  message: '请选择层级'
                }
              ]
            }
          ]}
          initialValues={{
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    staffLevel: {
      loading,
    },
  }: {
    staffLevel: StateType;
  }) => ({
    loading,
  }),
)(BasicAuditType);
