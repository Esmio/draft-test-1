import React, { useState, useEffect, useCallback, ReactText, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';

import { StateType } from './model';
import { Juror, ListItem } from './data.d';
import Main from '@/components/MainContainer';
import ControlBar from '@/components/ControlBar';
import CustomForm from '@/components/CustomForm';

interface Props {
  dispatch: Dispatch;
}

const Check: React.FC<Props & StateType> = ({
  dispatch,
  loading,
  list,
  pagination,
}) => {

  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ListItem[]>([]);
  const [status, setStatus] = useState('discipline_start');

  const searchRef = useRef<{ departmentId?: string; searchUserName?: string; }>({})

  // didMount
  useEffect(() => {
    const auditFail: boolean = status === 'discipline_submit_fail';
    dispatch({
      type: 'check/list',
      payload: {
        page: 1,
        size: 10,
        status,
        auditFail,
      }
    })
  }, []);

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

  const handleTabChange = useCallback(
    (status) => {
      const auditFail: boolean = status === 'discipline_submit_fail';
      dispatch({
        type: 'check/list',
        payload: {
          page: 1,
          size: 10,
          status,
          auditFail,
        }
      })
      setStatus(status);
    },
    [],
  )

  // 创建弹框提交
  const handleCreateOk = useCallback((values) => {
    dispatch({
      type: 'check/create',
      payload: values,
      callback: () => {
        setCreateModalVisible(false);
      }
    })
  }, [])

  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])

  // select rows
  const handleRowSelected:
    ((selectedRowKeys: ReactText[], selectedRows: never[]) => void) | undefined =
    (_, selectedRows) => {
      setSelectedRows(selectedRows);
    }

  // 分页
  const handlePageChange = useCallback(
    (page, size) => {
      dispatch({
        type: 'check/list',
        payload: {
          page,
          size,
          ...searchRef.current,
        }
      })
    },
    [],
  )

  return (
    <Main
      control={<ControlBar
        onCreate={onCreate}
        onEdit={onEdit}
        onRemove={onRemove}
      />}
      tabList={[
        {
          key: 'discipline_start',
          tab: '待提交'
        },
        {
          key: 'discipline_submit',
          tab: '待审核'
        },
        {
          key: 'discipline_submit_fail',
          tab: '未通过'
        },
        {
          key: 'discipline_approve',
          tab: '待处理'
        },
        {
          key: 'discipline_deal',
          tab: '待验证'
        },
        {
          key: 'discipline_finished',
          tab: '已完成'
        },
      ]}
      onTabChange={handleTabChange}
    >
      <Table
        bordered
        loading={loading}
        size="small"
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          onChange: handlePageChange
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: handleRowSelected,
        }}
        columns={[
          {
            title: '问题类别',
            dataIndex: 'categoryName',
            align: 'center',
            key: 'categoryName',
          },
          {
            title: '问题描述',
            dataIndex: 'problemDesc',
            align: 'center',
            key: 'problemDesc',
          },
          {
            title: '问题图片',
            dataIndex: 'imageUrl',
            align: 'center',
            key: 'imageUrl',
            render: url => (<img width="100px" src={url} />)
          },
          {
            title: '问题严重程度',
            dataIndex: 'severityName',
            align: 'center',
            key: 'severityName',
          },
          {
            title: '扣分',
            dataIndex: 'fraction',
            align: 'center',
            key: 'fraction',
          },
          {
            title: '负责人',
            dataIndex: 'responsibleName',
            align: 'center',
            key: 'responsibleName',
          },
          {
            title: '区域',
            dataIndex: 'departmentName',
            align: 'center',
            key: 'departmentName',
          },
          {
            title: '检查时间',
            dataIndex: 'planDate',
            align: 'center',
            key: 'planDate',
          },
          {
            title: '检查人员',
            dataIndex: 'qualityUserName',
            align: 'center',
            key: 'qualityUserName',
          },
          {
            title: '陪审员',
            dataIndex: 'processProblemUserDtoList',
            align: 'center',
            key: 'processProblemUserDtoList',
            render: arr => arr.map(({ userName }: Juror) => userName).join('，')
          },
        ]}
        dataSource={list}
        rowKey={({ id }) => id}
      />
      <Modal
        visible={createModalVisible}
        title="新建工艺纪律检查"
        onCancel={handleCreateCancel}
        footer={null}
      >
        <CustomForm
          name="create"
          items={[
            {
              label: "时间",
              name: 'planDate',
              type: 'readonly',
            },
            {
              label: "问题类别",
              name: 'categoryName',
              type: 'input',
              rules: [
                {
                  required: true,
                  message: '请填写问题类别'
                }
              ]
            },
          ]}
          initialValues={{
            planDate: '',
            categoryName: '',
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
    </Main>
  );
};

export default connect(
  ({
    check: {
      loading,
      list,
      pagination,
    },
  }: {
    check: StateType;
  }) => ({
    loading,
    list,
    pagination,
  }),
)(Check);
