import React, { ReactNode } from 'react';
import { Card } from 'antd';

import styles from './index.less';

interface TabItem {
  key: string;
  tab: string;
}

interface Props {
  search?: ReactNode,
  extra?: ReactNode,
  control?: ReactNode,
  bottom?: ReactNode,
  tabList?: TabItem[],
  onTabChange?: (key: string) => void;
}

const Container: React.FC<Props> = ({ 
  children,
  search,
  control,
  extra,
  bottom,
  tabList,
  onTabChange,
}) => {
  return (
    <Card
      className={styles.container}
      tabList={tabList}
      onTabChange={onTabChange}
    >
      <div className={styles.content}>
        {
          search || extra || control ?
          <section className={styles.top}>
            <div className={styles.left}>
              { search && <div className={styles.search}>
                  {search}
                </div> }
              {
                control && <div className={styles.control}>
                  {control}
                </div>
              }
            </div>
            <div className={styles.extra}>
              {extra}
            </div>
          </section> : null
        }
        {children}
      </div>
      {
        bottom ? 
        <section className={styles.bottom}>
          {bottom}
        </section> : null
      }
    </Card>
  )
}

export default Container;