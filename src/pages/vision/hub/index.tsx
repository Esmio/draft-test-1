import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Card, Button, Divider } from 'antd';

import { StateType } from './model';

import styles from './style.less';

interface Props {
  dispatch: Dispatch;
}

interface ImageItemType {
  name: string;
  url: string;
}

const ImageItem: React.FC<ImageItemType> = ({ name, url }) => (
  <div className={styles.imageContainer}>
    <div className={styles.img} style={{background: `url(${url}) center center / cover no-repeat`}}></div>
    <span className={styles.name}>{name}</span>
  </div>
)

const imgList = [
  {
    name: 'xxxxx1',
    url: '',
  },
  {
    name: 'xxxxx2',
    url: '',
  },
  {
    name: 'xxxxx3',
    url: '',
  },
  {
    name: 'xxxxx4',
    url: '',
  },
  {
    name: 'xxxxx5',
    url: '',
  },
]

const Hub: React.FC<Props & StateType> = ({ dispatch, customerList }) => {

  useEffect(() => {
    dispatch({
      type: 'hub/fetchFake',
    });
    dispatch({
      type: 'hub/getWheelInfo',
      payload: {
        wheel: 1
      }
    })
    dispatch({
      type: 'hub/getWheelList',
      payload: {
        customerId: 1,
      }
    })
  }, [dispatch]);

  return <Card
    title="轮毂型号01"
    extra={
      <Button type="link">刷新</Button>
    }
  >
    <div className={styles.imgListContainer}>
      {
        imgList.map((item, idx) => (
          <ImageItem
            key={idx}
            {...item}
          />
        ))
      }
    </div>
    <Divider />
    <h5>yml文件名称</h5>
    <code>
      xxxxxxxxxxxxxxx
    </code>
    <Divider />
    <div className={styles.footer}>更新时间：2020年06月06日</div>
  </Card>;
};

export default connect(({ hub: { customerList } }: { hub: StateType }) => ({
  customerList,
}))(Hub);
