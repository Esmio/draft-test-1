import React, { ReactNode } from 'react';
import { Card } from 'antd';

import styles from './index.less';

interface Props {
  search?: ReactNode,
  extra?: ReactNode,
  bottom?: ReactNode,
}

const Container: React.FC<Props> = ({ children, search, extra, bottom }) => {
  return (
    <Card
      className={styles.container}
    >
      <div className={styles.content}>
        {
          search || extra ?
          <section className={styles.top}>
            <div className={styles.search}>
              {search}
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