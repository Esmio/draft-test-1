import React, { useState, useEffect, useCallback, ReactText } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import { ListItem } from './data.d';
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
  list,
}) => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([])

  useEffect(() => {
    dispatch({
      type: 'issueBasicType/list',
    })
  }, [])
  // button
  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible])

  const onEdit = useCallback(() => {
    setEditModalVisible(true);
  }, [])

  // 删除提交
  const onRemove = useCallback(() => {
    console.log('current-selected-rows', selectedRows);
    Modal.confirm({
      title: '确定删除吗？',
      onOk: () => {
        dispatch({
          type: 'issueBasicType/remove',
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

  const onSearch = useCallback(() => {
  }, [])

  const handleCreateOk = useCallback((values) => {
    dispatch({
      type: 'issueBasicType/create',
      payload: values,
      callback: () => {
        setCreateModalVisible(false)
      }
    })
  }, [createModalVisible])

  const handleCreateModalCancle = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])

    // select rows
  const handleRowSelected: 
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined = 
    (_, selectedRows) => {
      setSelectedRows(selectedRows)
    }
  // 编辑弹框提交
  const handleEditConfirm = useCallback((values) => {
    dispatch({
      type: 'issueBasicType/update',
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

  return (
    <Main
    search={
      <SearchForm
        items={[
          {
            label: "问题类别",
            name: 'name',
            type: 'input',
          }
        ]}
        initialValues={{
          name: '',
        }}
        onFinish={onSearch}
      />
    }
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
        bordered
        loading={loading}
        size="small"
        pagination={false}
        columns={[
          {
            title: '问题类别',
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
        title="添加问题类别"
        footer={null}
        onCancel={handleCreateModalCancle}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "问题类别",
              name: 'name',
              type: 'input',
            }
          ]}
          initialValues={{
            name: '',
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title="编辑问题类别"
        onCancel={handleEditModalCancel}
        footer={null}
        destroyOnClose
      >
        <CustomForm
          name="edit"
          items={[
            {
              label: "问题类别",
              name: 'problemCategoryName',
              type: 'input',
            }
          ]}
          initialValues={{
            problemCategoryName: selectedRows[0]?.parentName,
          }}
          onFinish={handleEditConfirm}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    issueBasicType: {
      loading,
      list,
    },
  }: {
    issueBasicType: StateType;
  }) => ({
    loading,
    list,
  }),
)(BasicAuditType);
