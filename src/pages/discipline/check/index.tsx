import React, { useState, useEffect, useCallback, ReactText, useRef } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Table, Modal, Button } from 'antd';
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
  const [dealModalVisible, setDealModalVisible] = useState(false);
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

  // 删除提交
  const onRemove = useCallback(() => {
    const auditFail: boolean = status === 'discipline_submit_fail';
    Modal.confirm({
      title: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'check/remove',
          payload: {
            processProblemId: selectedRows.map(({id}: ListItem) => id),
          },
          callback: () => {
            setSelectedRows([]);
          },
          listQuery: {
            auditFail,
            ...pagination,
            status,
          }
        })
      }
    })
  }, [selectedRows])
  // Tab 切换
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
    console.log('edit-values', values);
    delete values.produceAndQuality;
    const { images, problemCategoryId, jurors, ...params } = values;
    const imageUrl = images && images[0]?.response ? images[0]?.response.data.url : undefined;
    const auditFail: boolean = status === 'discipline_submit_fail';
    dispatch({
      type: 'check/update',
      payload: {
        ...params,
        problemCategoryId: parseInt(problemCategoryId),
        jurors: jurors.map((userId: string) => {
          const { name: userName } = userList.find((item) => item.value === userId) || {}
          return {
            userId,
            userName,
          }
        }),
        imageUrl,
        id: selectedRows[0].id,
      },
      callback: () => {
        setEditModalVisible(false);
        setSelectedRows([])
      },
      listQuery: {
        auditFail,
        ...pagination,
        status,
      }
    })
  }, [editModalVisible, selectedRows, status])

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

  // 提交
  const handleSubmit = useCallback(() => {
    dispatch({
      type: 'check/submit',
      payload: {
        ids: selectedRows.map(({id}: ListItem) => id),
      }
    })
  }, [selectedRows])

  // 审核
  const handleAuthClicked = useCallback((title, reject, approve) => {
    Modal.confirm({
      title,
      okText: '审核',
      cancelText: '驳回',
      onOk: () => {
        handleAuth(approve)
      },
      onCancel: () => {
        handleAuth(reject)
      }
    })
  }, [])
  // 审核、提交等接口
  const handleAuth = useCallback((_status: number, payload?: {}) => {
    delete pagination.total;
    const auditFail: boolean = status === 'discipline_submit_fail';
    dispatch({
      type: 'check/auth',
      payload: {
        ...payload,
        ids: selectedRows.map(({id}: ListItem) => id),
        status: _status,
      },
      callback: () => {
        if(_status === 1) setDealModalVisible(false);
      },
      listQuery: {
        auditFail,
        ...pagination,
        status,
      }
    }) 
  }, [selectedRows, pagination, status])

  // 待处理Modal
  const handleDealModalClicked = useCallback(() => {
    setDealModalVisible(true);
  }, [])
  // 待处理Modal cancel
  const handleDealModalCancel = useCallback(() => {
    setDealModalVisible(false);
  }, [])

  // 处理Tab 的 Modal提交
  const handleDealConfirm = useCallback((values) => {
    console.log('deal-values', values);
    const { finishTime, dealWithImage } = values;
    const url = dealWithImage && dealWithImage[0]?.response.data.url;
    handleAuth(1, {
      ...values,
      finishTime: moment(finishTime).format('YYYY-MM-DD'),
      dealWithImage: url,
    })
  }, [selectedRows, status])

  console.log('selectedRows', selectedRows);

  return (
    <Main
      control={<ControlBar
        createLoading={preCreateLoading}
        canEdit={selectedRows.length === 1}
        canDelete={selectedRows.length > 0}
        // canDelete={selectedRows.length === 1}
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
      extra={
        <>
          {(status === 'discipline_start' || status === 'discipline_submit_fail' ) && <Button
            disabled={selectedRows.length === 0}
            type="primary"
            onClick={handleSubmit}
          >提交</Button>}
          {status === 'discipline_submit' && <Button
            disabled={selectedRows.length === 0}
            type="primary"
            onClick={handleAuthClicked.bind(null, '审核', -1, 0)}
          >审核</Button>}
          {status === 'discipline_approve' && <Button
            disabled={selectedRows.length !== 1}
            type="primary"
            onClick={handleDealModalClicked}
          >处理</Button>}
          {status === 'discipline_deal' && <Button
            disabled={selectedRows.length !== 1}
            type="primary"
            onClick={handleAuthClicked.bind(null, '验证', 3, 2)}
          >审核</Button>}
        </>
      }
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
            render: arr => arr?.map(({ userName }: Juror) => userName).join('，')
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
            jurors: selectedRows[0]?.processProblemUserDtoList?.map(({ userId }: Juror) => userId),
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
      <Modal
        title="待处理"
        visible={dealModalVisible}
        onCancel={handleDealModalCancel}
        footer={null}
      >
        <CustomForm
          name="deal"
          items={[
            {
              label: "原因分析",
              name: 'reason',
              type: 'textarea',
            },
            {
              label: "对策措施",
              name: 'auditComment',
              type: 'textarea',
            },
            {
              label: "完成时间",
              name: 'finishTime',
              type: 'datepicker',
            },
            {
              label: "上传照片",
              name: 'dealWithImage',
              type: 'uploader',
              valuePropName: 'fileList',
              getValueFromEvent: e => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }
            },
          ]}
          onFinish={handleDealConfirm}
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
