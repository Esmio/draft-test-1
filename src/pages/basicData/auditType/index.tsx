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
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([])

  useEffect(() => {
    dispatch({
      type: 'basicAuditType/getAuditTypeList',
    })
  }, [])

  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible]);

  const onEdit = useCallback(() => {
  }, [])

  const onRemove = useCallback(() => {
  }, [])

    // select rows
  const handleRowSelected: 
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined = 
    (selectedRowKeys, selectedRows) => {
      console.log('selectedRowKeys', selectedRowKeys)
      console.log('selectedRows', selectedRows)
      setSelectedRows(selectedRows)
    }

  const handleOk = useCallback((values) => {
    dispatch({
      type: 'basicAuditType/creatAuditType',
      payload: values,
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])

  const handleCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])

  return (
    <Main
      control={
        <ControlBar
          canEdit={selectedRows.length === 1}
          canDelete={selectedRows.length > 0}
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
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CustomForm
          name="modal"
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
