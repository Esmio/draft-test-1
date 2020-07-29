import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import { ListItem } from './data.d';
import Main from '@/components/MainContainer';
import ControlBar from '@/components/ControlBar';
import CustomForm from '@/components/CustomForm';

interface Props {
  dispatch: Dispatch;
}

const Severity: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  list,
}) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([])

  // 默认获取列表
  useEffect(() => {dispatch({type: 'severity/list'})}, [])

  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible])
  const onEdit = useCallback(() => {
    setEditModalVisible(true);
  }, [editModalVisible])
  const onRemove = useCallback(() => {
    Modal.confirm({
      title: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'severity/remove',
          payload: {
            id: selectedRows[0].id,
          },
          callback: () => {
            setSelectedRows([]);
          }
        })
      }
    })
  }, [selectedRows])

  // select rows
  const handleRowSelected: 
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined = 
    (_, selectedRows) => {
      setSelectedRows(selectedRows)
    }
  // 创建弹框取消 
  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])
  // 创建弹框提交
  const handleCreateOk = useCallback((values) => {
    dispatch({
      type: 'severity/create',
      payload: values,
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])
  // 编辑弹框提交
  const handleEditConfirm = useCallback((values) => {
    dispatch({
      type: 'severity/update',
      payload: {
        ...values,
        id: selectedRows[0].id,
      },
      callback: () => {
        setEditModalVisible(false);
      }
    })
  }, [editModalVisible])
  // 编辑弹框取消
  const handleEditModalCancel = useCallback(() => {
    setEditModalVisible(false)
  }, [editModalVisible])

  return (
    <Main
      control={<ControlBar
        canEdit={selectedRows.length === 1}
        // canDelete={selectedRows.length > 0}
        canDelete={selectedRows.length === 1}
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
      />}
    >
      <Table
        bordered
        loading={loading}
        size="small"
        pagination={false}
        columns={[
          {
            title: '问题严重度',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
          },
          {
            title: '对应扣分',
            dataIndex: 'fraction',
            key: 'fraction',
            align: 'center',
            render: value => parseInt(value),
          },
        ]}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        dataSource={list}
        rowKey={({ id }) => id}
      />
      <Modal
        visible={createModalVisible}
        title="创建问题严重度"
        onCancel={handleCreateCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "问题严重度",
              name: 'name',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写问题严重度'
                }
              ]
            },
            {
              label: "对应扣分",
              name: 'fraction',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写对应扣分'
                }
              ]
            },
          ]}
          initialValues={{
            name: '',
            fraction: '',
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title="编辑审核类别"
        onCancel={handleEditModalCancel}
        footer={null}
        destroyOnClose
      >
        <CustomForm
          name="edit"
          items={[
            {
              label: "问题严重度",
              name: 'name',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写问题严重度'
                }
              ]
            },
            {
              label: "对应扣分",
              name: 'fraction',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写对应扣分'
                },
              ]
            },
          ]}
          initialValues={{
            name: selectedRows[0]?.name,
            fraction: selectedRows[0]?.fraction,
          }}
          onFinish={handleEditConfirm}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    severity: {
      loading,
      list,
    },
  }: {
    severity: StateType;
  }) => ({
    loading,
    list,
  }),
)(Severity);
