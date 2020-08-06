import React, { useState, useEffect, useCallback, ReactText, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal } from 'antd';
import moment from 'moment';

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
  preCreateObj,
  userList,
  preCreateLoading,
  categoryList,
  severityList,
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
    dispatch({type: 'check/userList'});
    dispatch({type: 'check/categoryList'});
    dispatch({type: 'check/severityList'});
  }, []);

  // 增
  const onCreate = useCallback(() => {
    dispatch({
      type: 'check/preCreate',
      callback: () => {
        setCreateModalVisible(true);
      }
    })
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
    delete values.produceAndQuality;
    const { images, problemCategoryId, jurors, ...params } = values;
    const imageUrl = images && images[0]?.response.data.url;
    const {
      planDate,
      produceUserId,
      qualityUserId,
      id: checkPlanId,
    } = preCreateObj!;
    const auditFail: boolean = status === 'discipline_submit_fail';
    delete pagination.total;
    dispatch({
      type: 'check/create',
      payload: {
        ...params,
        problemCategoryId: parseInt(problemCategoryId),
        jurors: jurors.map((userId: string) => {
          const { name: userName } = userList.find((item) => item.value === userId)!
          return {
            userId,
            userName,
          }
        }),
        imageUrl,
        planDate,
        produceUserId,
        qualityUserId,
        checkPlanId,
      },
      callback: () => {
        setCreateModalVisible(false);
      },
      listQuery: {
        auditFail,
        ...pagination,
        status,
      }
    })
  }, [preCreateObj, status, pagination, ])

  // 编辑弹框提交
  const handleEditConfirm = useCallback((values) => {
    dispatch({
      type: 'check/update',
      payload: {
        ...values,
        id: selectedRows[0].id,
      },
      callback: () => {
        setEditModalVisible(false);
      }
    })
  }, [editModalVisible, selectedRows])

  const handleCreateCancel = useCallback(() => {
    setCreateModalVisible(false);
  }, [createModalVisible])
  // 编辑弹框取消
  const handleEditModalCancel = useCallback(() => {
    setEditModalVisible(false)
  }, [editModalVisible])

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

  console.log('selectedRows', selectedRows);

  return (
    <Main
      control={<ControlBar
        createLoading={preCreateLoading}
        canEdit={selectedRows.length === 1}
        // canDelete={selectedRows.length > 0}
        canDelete={selectedRows.length === 1}
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
              label: "区域",
              name: 'departmentName',
              type: 'readonly',
            },
            {
              label: "检查人员",
              name: 'produceAndQuality',
              type: 'readonly',
            },
            {
              label: "陪审员",
              name: 'jurors',
              type: 'select',
              mode: 'multiple',
              typeOptions: userList,
              rules: [
                {
                  required: true,
                  message: '请选择陪审员'
                }
              ]
            },
            {
              label: "问题类别",
              name: 'problemCategoryId',
              type: 'select',
              typeOptions: categoryList,
              rules: [
                {
                  required: true,
                  message: '请选择问题类别'
                }
              ]
            },
            {
              label: "问题图片",
              name: 'images',
              type: 'uploader',
              valuePropName: 'fileList',
              getValueFromEvent: e => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
              rules: [
                {
                  required: true,
                  message: '请上传图片'
                }
              ]
            },
            {
              label: "问题描述",
              name: 'problemDesc',
              type: 'textarea',
            },
            {
              label: "问题严重度",
              name: 'severityId',
              type: 'select',
              typeOptions: severityList,
              rules: [
                {
                  required: true,
                  message: '请选择问题严重度'
                }
              ]
            },
          ]}
          initialValues={{
            // planDate: moment().format('YYYY-MM'),
            //preCreateObj
            departmentName: preCreateObj?.departmentName,
            planDate: preCreateObj?.planDate,
            produceUserId: preCreateObj?.produceUserId,
            produceUserName: preCreateObj?.produceUserName,
            qualityUserId: preCreateObj?.qualityUserId,
            qualityUserName: preCreateObj?.qualityUserName,
            produceAndQuality: `${preCreateObj?.produceUserName}，${preCreateObj?.qualityUserName}`,
            //pre
            // departmentName: '',
            // qualityUserName: '',
            processProblemUserDtoList: [],
            problemCategoryId: '',
            imageUrl: '',
            problemDesc: '',
            severityId: '',
          }}
          onFinish={handleCreateOk}
        />
      </Modal>
      <Modal
        visible={editModalVisible}
        title="编辑工艺纪律检查"
        onCancel={handleEditModalCancel}
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
              label: "区域",
              name: 'departmentName',
              type: 'readonly',
            },
            {
              label: "检查人员",
              name: 'produceAndQuality',
              type: 'readonly',
            },
            {
              label: "陪审员",
              name: 'jurors',
              type: 'select',
              mode: 'multiple',
              typeOptions: userList,
              rules: [
                {
                  required: true,
                  message: '请选择陪审员'
                }
              ]
            },
            {
              label: "问题类别",
              name: 'problemCategoryId',
              type: 'select',
              typeOptions: categoryList,
              rules: [
                {
                  required: true,
                  message: '请选择问题类别'
                }
              ]
            },
            {
              label: "问题图片",
              name: 'images',
              type: 'uploader',
              valuePropName: 'fileList',
              getValueFromEvent: e => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              },
              rules: [
                {
                  required: true,
                  message: '请上传图片'
                }
              ]
            },
            {
              label: "问题描述",
              name: 'problemDesc',
              type: 'textarea',
            },
            {
              label: "问题严重度",
              name: 'severityId',
              type: 'select',
              typeOptions: severityList,
              rules: [
                {
                  required: true,
                  message: '请选择问题严重度'
                }
              ]
            },
          ]}
          initialValues={{
            // planDate: moment().format('YYYY-MM'),
            //preCreateObj
            departmentName: selectedRows[0]?.departmentName,
            planDate: selectedRows[0]?.planDate,
            produceUserId: selectedRows[0]?.produceUserId,
            produceUserName: selectedRows[0]?.produceUserName,
            qualityUserId: selectedRows[0]?.qualityUserId,
            qualityUserName: selectedRows[0]?.qualityUserName,
            produceAndQuality: `${selectedRows[0]?.produceUserName}，${selectedRows[0]?.qualityUserName}`,
            //pre
            // departmentName: '',
            // qualityUserName: '',
            jurors: selectedRows[0]?.processProblemUserDtoList.map(({ userId }: Juror) => userId),
            problemCategoryId: selectedRows[0]?.categoryId,
            imageUrl: selectedRows[0]?.imageUrl,
            problemDesc: selectedRows[0]?.problemDesc,
            severityId: selectedRows[0]?.severityId,
            images: selectedRows[0] && [{
              uid: '-1',
              name: 'img',
              status: 'done',
              url: selectedRows[0].imageUrl,
            }]
          }}
          onFinish={handleEditConfirm}
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
      preCreateObj,
      userList,
      preCreateLoading,
      categoryList,
      severityList,
    },
  }: {
    check: StateType;
  }) => ({
    loading,
    list,
    pagination,
    preCreateObj,
    userList,
    preCreateLoading,
    categoryList,
    severityList,
  }),
)(Check);
