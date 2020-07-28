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
  list,
}) => {

  const [createModalVisible, setCreateModalVisible] = useState(false)

  useEffect(() => {
    dispatch({
      type: 'issueBasicType/list',
    })
  }, [])

  const onCreate = useCallback(() => {
    setCreateModalVisible(true);
  }, [createModalVisible])

  const onEdit = useCallback(() => {
  }, [])

  const onRemove = useCallback(() => {
  }, [])

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

    }

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
            dataIndex: 'name',
            key: 'name',
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
        rowKey={({ id }) => id}
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
