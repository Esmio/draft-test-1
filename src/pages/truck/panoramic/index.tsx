import React, { useState, useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'dva';
import { Card, Select, Switch, Table, Divider, Badge } from 'antd';

import { Site, Route, RealTime } from './data.d';
import { StateType } from './model';
import styles from './style.less';
import * as iconData from './icon_data';

const { Option } = Select;

type BoundaryData = {
  maxWidth: number;
  maxHeight: number;
}

const getContainerSize = (routes: Route[], sites: Site[]): BoundaryData => {

  let canvasWidthMin = 0;
  let canvasWidthMax = 0;
  let canvasHeightMin = 0;
  let canvasHeightMax = 0;
  for (let i = 0; i < routes.length; i++) {
    for (let j = 0; j < routes[i].positions.length; j++) {
      const turns = routes[i].positions[j];
      if (Number(turns.positionX) === 100000000) continue;
      if (Number(turns.positionY) === 100000000) continue;
      canvasWidthMin =
        canvasWidthMin > Number(turns.positionX) ? Number(turns.positionX) : canvasWidthMin;
      canvasWidthMax =
        canvasWidthMax < Number(turns.positionX) ? Number(turns.positionX) : canvasWidthMax;
      canvasHeightMin =
        canvasHeightMin > Number(turns.positionY) ? Number(turns.positionY) : canvasHeightMin;
      canvasHeightMax =
        canvasHeightMax < Number(turns.positionY) ? Number(turns.positionY) : canvasHeightMax;
    }
  }
  for (let i = 0; i < sites.length; i++) {
    const turns = sites[i];
    canvasWidthMin =
      canvasWidthMin > Number(turns.positionX) ? Number(turns.positionX) : canvasWidthMin;
    canvasWidthMax =
      canvasWidthMax < Number(turns.positionX) ? Number(turns.positionX) : canvasWidthMax;
    canvasHeightMin =
      canvasHeightMin > Number(turns.positionY) ? Number(turns.positionY) : canvasHeightMin;
    canvasHeightMax =
      canvasHeightMax < Number(turns.positionY) ? Number(turns.positionY) : canvasHeightMax;
  }
  const maxWidth = canvasWidthMax - canvasWidthMin;
  const maxHeight = canvasHeightMax - canvasHeightMin;
  return {
    maxWidth,
    maxHeight,
  }
}

const convertPositions = (routes: Route[], sites: Site[], maxWidth: number, maxHeight: number) => {
  const sitesResult = sites.map(({ positionX, positionY, ...rest }) => {
    const transformedX = (maxWidth + Number(positionX)).toString();
    const transformedY = (maxHeight - Number(positionY) - maxHeight / 2).toString();
    return {
      positionX: transformedX,
      positionY: transformedY,
      ...rest,
    };
  });
  const routesResult = routes.map(({ positions, ...routeRest }) => {
    const _position = positions.map(({ positionX, positionY, ...positionRest }) => {
      const transformedX =
        Number(positionX) === 100000000
          ? positionX
          : (maxWidth + Number(positionX)).toString();
      const transformedY =
        Number(positionY) === 100000000
          ? positionY
          : (maxHeight - Number(positionY) - maxHeight / 2).toString();
      return {
        positionX: transformedX,
        positionY: transformedY,
        ...positionRest,
      };
    });
    return {
      positions: _position,
      ...routeRest,
    };
  });
  return {
    sitesResult,
    routesResult,
  }
}

const drawMainMap = (routesResult: Route[], sitesResult: Site[], maxWidth: number) => {
  const paintWidth = 1300;
  const canvasScale = maxWidth / paintWidth;
  const upwardShift = 70;
  const rightShift = 50;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  ctx.strokeStyle = "#EBEBEB";
  ctx.lineWidth = 6;
  ctx.beginPath();
  routesResult?.forEach(({ positions }) => {
    positions.forEach(({ positionX, positionY, type }) => {
      if (Number(positionX) !== 100000000 || Number(positionY) !== 100000000) {
        const x = Number(positionX) / canvasScale + rightShift;
        const y = Number(positionY) / canvasScale - upwardShift;
        if (type === 'startSite') ctx.moveTo(x, y);
        if (type === 'endSite' || type === "tpoint1" || type === "tpoint2" ) ctx.lineTo(x, y);
      }
    });
  });
  sitesResult?.forEach(({ positionX, positionY, type, acsname }) => {
    if (Number(positionX) !== 100000000 || Number(positionY) !== 100000000) {
      const x = Number(positionX) / canvasScale + rightShift;
      const y = Number(positionY) / canvasScale - upwardShift;
      if(type === 'p0') ctx.moveTo(x, y);
      if(type === 'p3') ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
  sitesResult?.forEach(({ positionX, positionY, type, acsname }) => {
    if (Number(positionX) !== 100000000 || Number(positionY) !== 100000000) {
      const x = Number(positionX) / canvasScale + rightShift;
      const y = Number(positionY) / canvasScale - upwardShift;
      const matchedArr = acsname.match(/([\u4e00-\u9fa5]+)(\d+)/);
      const [, cName, num] = matchedArr || [];
      if((type === 'p3' && cName !== '路径点') || (type === 'p0' && cName === '路径点')) {
        const oImg = new Image();
        oImg.src = iconData[cName];
        ctx.drawImage(oImg, x - 20, y - 20, 40, 40);
        if(cName !== '路径点') {
          ctx.font = "14px Arial";
          ctx.fillStyle = '#000'
          ctx.fillText(num, cName === '放货点' ? x : x + 10, y + 5);
        }
        ctx.font = "16px Arial";
        ctx.fillStyle = '#b8befc'
        ctx.textAlign = "center";
        ctx.fillText(cName, x, y + 40);
        oImg.onload = (ex) => {
        }
      }
    }
  })
}

const paintMap = (routes: Route[], sites: Site[]) => {
  const { maxWidth, maxHeight } = getContainerSize(routes, sites);

  const { routesResult, sitesResult } = convertPositions(routes, sites, maxWidth, maxHeight);

  drawMainMap(routesResult, sitesResult, maxWidth);

  return { maxWidth, maxHeight };
};

const paintCars = (realTimeList: RealTime[], maxWidth: number) => {
  if(!realTimeList || realTimeList.length === 0) return;
  const paintWidth = 1300;
  const canvasScale = maxWidth / paintWidth;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext('2d')!;
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  const [car1, car2, car3] = realTimeList;
  console.log('car1', car1);
  console.log('car2', car2);
  console.log('car3', car3);
  drawCar(ctx, car1, '黄色小车', canvasScale);
  drawCar(ctx, car2, '红色小车', canvasScale);
  drawCar(ctx, car3, '绿色小车', canvasScale);
  ctx.stroke();
}

const drawCar = (ctx: CanvasRenderingContext2D, car: RealTime, carName: string, canvasScale: number) => {
  const upwardShift = 70;
  const rightShift = 50;
  const { positionX : x1, positionY: y1 } = car;
  const numX1 = Number(x1) / canvasScale + rightShift;
  const numY1 = Number(y1) / canvasScale - upwardShift;
  console.log('num:x1,y1', numX1, numY1);
  const oImg = new Image();
  oImg.src = iconData['黄色叉车'];
  ctx.drawImage(oImg, numX1 - 20, numY1 - 20, 40, 40);
}

interface Props {
  dispatch: Dispatch;
}

const Panaroma: React.FC<Props & StateType> = ({
  dispatch,
  customerList,
  baseInfo,
  baseInfoLoading,
  realTimeList,
  realTimeLoading,
  sites,
  routes,
}) => {
  const [ company, setCompany ] = useState<string>();
  const [ containerSize, setContainerSize ] = useState<{ maxWidth: number; maxHeight: number }>({maxWidth: 0, maxHeight: 0})
  const [ didPaintMainMap ,setDidPaintMainMap ] = useState<boolean>(false)

  // console.log('sites', sites);
  // console.log('routes', routes);
  // console.log('realTimeList', realTimeList);

  useEffect(() => {
    dispatch({
      type: 'panorama/getCustomerList',
    });
    dispatch({
      type: 'panorama/getMachineList',
      payload: {
        pageNum: 1,
        pageSize: 10,
      },
    });
    dispatch({
      type: 'panorama/getSites',
    });
    dispatch({
      type: 'panorama/getRoutes',
    })
    dispatch({
      type: 'panorama/getMachineAll',
      payload: {
        pageNum: 1,
        pageSize: 10,
      },
    });
    dispatch({
      type: 'panorama/getRoutes',
    })
  }, []);

  useEffect(() => {
    if(didPaintMainMap) paintCars(realTimeList, containerSize.maxWidth);
  }, [realTimeList, containerSize, didPaintMainMap])

  useEffect(() => {
    setTimeout(() => {
      // dispatch({
      //   type: 'panorama/getMachineAll',
      //   payload: {
      //     pageNum: 1,
      //     pageSize: 10,
      //   },
      // });
      // setClock(+new Date)
    }, 500)
  }, [])

  useEffect(() => {
    const { maxWidth, maxHeight } = paintMap(routes, sites);
    setContainerSize({ maxWidth, maxHeight })
    setDidPaintMainMap(true);
  }, [routes, sites])

  useEffect(() => {

  }, [realTimeList])

  useEffect(() => {
    if (!customerList || !(customerList.length > 0)) {
      return;
    }
    const customerId = customerList[0].id;
    setCompany(customerId);
    dispatch({
      type: 'panorama/getBaseInfo',
      payload: {
        customerId,
      },
    });
  }, [customerList]);

  const handleCompanyChange = (value: string) => {
    setCompany(value);
  };

  return (
    <>
      <Card
        title="叉车全景图"
        extra={
          <Select value={company} className={styles.select} onChange={handleCompanyChange}>
            {customerList.map(({ id, name }) => (
              <Option value={id} key={id}>
                {name}
              </Option>
            ))}
          </Select>
        }
      >
        <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <canvas id="canvas" width="1300" height="800" style={{ alignSelf: 'center' }}></canvas>
        </div>
        <div className={styles.line}>
          <span className={styles.label}>路径显示</span>
          <Switch />
        </div>
        <Divider />
        <div className={styles.title}>站点信息</div>
        <Table
          bordered
          loading={baseInfoLoading}
          size="small"
          columns={[
            {
              title: '叉车',
              dataIndex: 'forklift',
              key: 'forklift',
              align: 'center',
            },
            {
              title: '放货点',
              dataIndex: 'deliveryPoint',
              key: 'deliveryPoint',
              align: 'center',
            },
            {
              title: '充电点',
              dataIndex: 'chargePoint',
              key: 'chargePoint',
              align: 'center',
            },
            {
              title: '取货点',
              dataIndex: 'pickPoint',
              key: 'pickPoint',
              align: 'center',
            },
            {
              title: '路径点',
              dataIndex: 'pathPoint',
              key: 'pathPoint',
              align: 'center',
            },
            {
              title: '货物点',
              dataIndex: 'goodsPoint',
              key: 'goodsPoint',
              align: 'center',
            },
            {
              title: '临时避让点',
              dataIndex: 'tmpPoint',
              key: 'tmpPoint',
              align: 'center',
            },
            {
              title: '待机点',
              dataIndex: 'waitPoint',
              key: 'waitPoint',
              align: 'center',
            },
          ]}
          dataSource={baseInfo ? [{ ...baseInfo, key: 1 }] : []}
          pagination={false}
        />
      </Card>
      <Card title="小车列表" className={styles.rowContainer}>
        <Table
          bordered
          loading={realTimeLoading}
          size="small"
          dataSource={realTimeList}
          pagination={false}
          rowKey={({id}) => id}
          columns={[
            {
              title: '位姿x',
              dataIndex: 'positionX',
              key: 'positionX',
              align: 'center',
            },
            {
              title: '位姿y',
              dataIndex: 'positionY',
              key: 'positionY',
              align: 'center',
            },
            {
              title: '位姿-角度',
              dataIndex: 'angle',
              key: 'angle',
              align: 'center',
            },
            {
              title: '额定速度',
              dataIndex: 'lgvMaxSpeed',
              key: 'lgvMaxSpeed',
              align: 'center',
            },
            {
              title: '空载速度',
              dataIndex: 'lgvUnloadSpeed',
              key: 'lgvUnloadSpeed',
              align: 'center',
            },
            {
              title: '额定负载',
              dataIndex: 'lgvLoad',
              key: 'lgvLoad',
              align: 'center',
            },
            {
              title: '当前负载',
              dataIndex: 'lgvLoading',
              key: 'lgvLoading',
              align: 'center',
            },
            {
              title: '运行状态',
              dataIndex: 'statusText',
              key: 'statusText',
              align: 'center',
              render: (text, { status }) => {
                const statusMap = {
                  '-1': 'default',
                  0: 'success',
                  3: 'warning',
                }
                return (
                  <>
                    <Badge status={statusMap[status]} />
                    {text}
                  </>
                )
              },
            },
          ]}
        />
      </Card>
    </>
  );
};

export default connect(
  ({
    panorama: {
      customerList,
      sites,
      routes,
      baseInfo,
      machineList,
      baseInfoLoading,
      realTimeList,
      realTimeLoading,
    },
  }: {
    panorama: StateType;
  }) => ({
    customerList,
    sites,
    routes,
    baseInfo,
    machineList,
    baseInfoLoading,
    realTimeList,
    realTimeLoading,
  }),
)(Panaroma);
