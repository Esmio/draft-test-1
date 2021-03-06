import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: false,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

if (isAntDesignProPreview) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: isAntDesignProPreview ? 'source-map' : false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/plan',
              name: 'plan',
              component: './plan',
            },
            {
              path: '/shiftApply',
              name: 'shiftApply',
              component: './shiftApply',
            },
            {
              path: '/list',
              name: 'list',
              component: './list',
            },
            {
              path: '/issue',
              name: 'issue',
              routes: [
                {
                  path: '/issue/board',
                  name: 'board',
                  component: './issue/board'
                },
                {
                  path: '/issue/list',
                  name: 'list',
                  component: './issue/list'
                },
              ]              
            },
            {
              path: '/statistics',
              name: 'statistics',
              routes: [
                {
                  path: '/statistics/amount',
                  name: 'amount',
                  component: './statistics/amount'
                },
                {
                  path: '/statistics/auditAnalysis',
                  name: 'auditAnalysis',
                  component: './statistics/auditAnalysis'
                },
                {
                  path: '/statistics/closingRate',
                  name: 'closingRate',
                  component: './statistics/closingRate'
                },
                {
                  path: '/statistics/relatedDepartment',
                  name: 'relatedDepartment',
                  component: './statistics/relatedDepartment'
                },
              ]
            },
            {
              path: '/discipline/checkPlan',
              name: 'discipline.checkPlan',
              component: './discipline/checkPlan',
            },
            {
              path: '/discipline/checkBoard',
              name: 'discipline.checkBoard',
              component: './discipline/checkBoard',
            },
            {
              path: '/discipline/checkShiftApply',
              name: 'discipline.checkShiftApply',
              component: './discipline/checkShiftApply',
            },
            {
              path: '/discipline/check',
              name: 'discipline.check',
              component: './discipline/check',
            },
            {
              path: '/discipline/checkStatistics',
              name: 'discipline.checkStatistics',
              routes: [
                {
                  path: '/discipline/checkStatistics/scoreDiagram',
                  name: 'scoreDiagram',
                  component: './discipline/checkStatistics/scoreDiagram',
                },
                {
                  path: '/discipline/checkStatistics/issueAmount',
                  name: 'issueAmount',
                  component: './discipline/checkStatistics/issueAmount',
                }
              ]
            },
            {
              path: '/basicData',
              name: 'basicData',
              routes: [
                {
                  path: '/basicData/list',
                  name: 'list',
                  component: './basicData/list'
                },
                {
                  path: '/basicData/auditType',
                  name: 'auditType',
                  component: './basicData/auditType'
                },
                {
                  path: '/basicData/staffLevel',
                  name: 'staffLevel',
                  component: './basicData/staffLevel'
                },
                {
                  path: '/basicData/issueType',
                  name: 'issueType',
                  component: './basicData/issueType'
                },
                {
                  path: '/basicData/severity',
                  name: 'severity',
                  component: './basicData/severity'
                },
              ]
            },
            {
              redirect: '/plan'
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,

  proxy: {
    '/api/': {
      target: 'http://192.168.0.122:8700/yp_gate/ypkq/layer',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/uapi/': {
      target: 'http://192.168.0.122:8700/yp_gate/ypkq',
      changeOrigin: true,
      pathRewrite: { '^/uapi': '' },
    }
  },
} as IConfig;
