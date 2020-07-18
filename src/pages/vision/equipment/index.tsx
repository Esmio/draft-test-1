import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Row, Col, DatePicker, Button } from 'antd';
import { FolderOpenFilled } from '@ant-design/icons';


import { StateType } from './model';

import styles from './style.less';

const { RangePicker } = DatePicker;

interface Props {
  dispatch: Dispatch;
}

interface FileBarProps {
  filename: string;
  updateTime: string;
  onReplace: () => void;
}

const FileBar: React.FC<FileBarProps> = ({ filename, updateTime, onReplace }) => (
  <div className={styles.filebar}>
    <div className={styles.iconContainer}>
      {/* <div className={styles.fileIcon}></div> */}
      <FolderOpenFilled />
      <div className={styles.filename}>{filename}</div>
    </div>
    <div className={styles.updateTime}>更新时间：{updateTime}</div>
    <Button type="link" onClick={onReplace}>替换</Button>
  </div>
)

const Equipment: React.FC<Props & StateType> = ({ dispatch, customerList }) => {
  const [curLogKey, setCurLogKey] = useState<string>('1');

  useEffect(() => {
    dispatch({
      type: 'equipment/fetchFake',
    });
    dispatch({
      type: 'equipment/getLibraryInfo',
      payload: {
        customerId: 1,
      }
    });
    dispatch({
      type: 'equipment/getConfigInfo',
      payload: {
        customerId: 1,
      }
    })
    dispatch({
      type: 'equipment/getLoggingInfo',
      payload: {
        customerId: 1,
        date: '2020-05-01',
        level: 1,
      }
    })
    dispatch({
      type: 'equipment/getImageInfo',
      payload: {
        customerId: 1,
      }
    })
  }, [dispatch]);

  const tabList = [
    {
      key: '1',
      tab: '运行日志',
    },
    {
      key: '2',
      tab: '崩溃日志',
    },
  ];

  const fileList = [
    {
      filename: '文件1',
      updateTime: '19-12-20 12:00',
      onReplace: () => {
      }
    },
    {
      filename: '文件2',
      updateTime: '19-12-20 12:00',
      onReplace: () => {
      }
    },
  ]

  const contentList = {
    '1': <p>content1</p>,
    '2': <p>content2</p>,
  };

  const replaceFile = (idx: number) => {
  }

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Card
            tabList={tabList}
            tabBarExtraContent={
              <>
                <RangePicker />
                <Button style={{ marginLeft: 24 }} type="link">
                  刷新
                </Button>
              </>
            }
            onTabChange={key => {
              setCurLogKey(key);
            }}
          >
            <div className={styles.cardContent}>{contentList[curLogKey]}</div>
            <div className={styles.cardFooter}>
              <span>更新时间2019年12月20日 12:00</span>
              <Button type="primary">下载</Button>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            tabList={[{ tab: '配置信息', key: '1' }]}
            tabBarExtraContent={
              <Button style={{ marginLeft: 24 }} type="link">
                刷新
              </Button>
            }
          >
            <div className={styles.cardContent}>content1</div>
            <div className={styles.cardFooter}>
              <span>更新时间2019年12月20日 12:00</span>
              <Button type="primary">替换</Button>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={24} className={styles.rowContainer}>
        <Col span={14}>
          <Card
            tabList={[{ tab: '动态链接库信息', key: '1' }]}
            tabBarExtraContent={
              <Button type="link">
                刷新
              </Button>
            }
            bodyStyle={{
              height: 257,
            }}
          >
            {fileList.map((item, idx) => (
              <FileBar 
                key={idx}
                {...item}
                onReplace={() => {
                  replaceFile(idx)
                }}
              />
            ))}
          </Card>
        </Col>
        <Col span={10}>
          <Card
            tabList={[{ tab: '图片信息', key: '1' }]}
            tabBarExtraContent={
              <Button type="link">
                刷新
              </Button>
            }
            bodyStyle={{
              height: 257,
            }}
          >
            yyyyyy
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default connect(({ equipment: { customerList } }: { equipment: StateType }) => ({
  customerList,
}))(Equipment);
