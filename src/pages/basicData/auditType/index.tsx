import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import { ListItem } from './data.d';
import Main from '@/components/MainContainer';
import ControlBar from "@/components/ControlBar";
import CustomForm from '@/components/CustomForm';

interface Props {
  dispatch: Dispatch;
}

const BasicAuditType: React.FC<Props & StateType> = ({
  dispatch,
  list,
  loading,
}) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([])
  
  useEffect(() => {
    dispatch({
      type: 'basicAuditType/getAuditTypeList',
    })
  }, [])
  // 增
  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible]);
  // 改
  const onEdit = useCallback(() => {
    setEditModalVisible(true);
  }, [editModalVisible]);

  // 删除提交
  const onRemove = useCallback(() => {
    Modal.confirm({
      title: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'basicAuditType/deleteAuditType',
          payload: {
            id: selectedRows[0].parentId,
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
  // 创建弹框提交
  const handleOk = useCallback((values) => {
    dispatch({
      type: 'basicAuditType/creatAuditType',
      payload: values,
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])
  // 编辑弹框提交
  const handleEditConfirm = useCallback((values) => {
    dispatch({
      type: 'basicAuditType/updateAuditType',
      payload: {
        ...values,
        id: selectedRows[0].parentId,
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

  const handleCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])

  return (
    <Main
      control={
        <ControlBar
          canEdit={selectedRows.length === 1}
          // canDelete={selectedRows.length > 0}
          canDelete={selectedRows.length === 1}
          onCreate={onCreate}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      }
    >
      <Table
        loading={loading}
        bordered
        size="small"
        pagination={false}
        columns={[
          {
            title: '审核类别',
            dataIndex: 'parentName',
            key: 'parentName',
            align: 'center',
          },
          {
            title: '添加时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
          },
        ]}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        dataSource={list}
        rowKey={({ parentId }) => parentId}
      />
      <Modal
        visible={createModalVisible}
        title="新增审核类别"
        onCancel={handleCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "审核类别",
              name: 'name',
              type: 'input',
            }
          ]}
          initialValues={{
            name: '',
          }}
          onFinish={handleOk}
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
              label: "审核类别",
              name: 'processName',
              type: 'input',
            }
          ]}
          initialValues={{
            processName: selectedRows[0]?.parentName,
          }}
          onFinish={handleEditConfirm}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    basicAuditType: {
      list,
      loading,
    },
  }: {
    basicAuditType: StateType;
  }) => ({
    list,
    loading,
  }),
)(BasicAuditType);
