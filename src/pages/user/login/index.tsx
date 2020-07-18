import React, { Component } from 'react';
import { Alert, Checkbox } from 'antd';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FormComponentProps } from '@ant-design/compatible/es/form';
// import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from './model';
import LoginComponents from './components/Login';
import styles from './style.less';

const { UserName, Password, Submit, Member } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<any>;
  userAndlogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
}
export interface FormDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    // eslint-disable-next-line react/no-unused-prop-types
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: any, values: FormDataType) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: {
          ...values,
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }
      this.loginForm.validateFields(['mobile'], {}, (err: any, values: FormDataType) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          ((dispatch({
            type: 'userAndlogin/getCaptcha',
            payload: values.mobile,
          }) as unknown) as Promise<any>)
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={(form: any) => {
            this.loginForm = form;
          }}
        >
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                '账户或密码错误',
              )}
            <Member
              name="member"
              placeholder="请输入公司名"
              rules={[
                {
                  required: true,
                  message: '请输入公司名',
                },
              ]}
            />
            <UserName
              name="username"
              placeholder="请输入用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="请输入密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                // eslint-disable-next-line no-unused-expressions
                this.loginForm?.validateFields(this.handleSubmit);
              }}
            />
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
            {/* <a style={{ float: 'right' }} href="">
              <FormattedMessage id="userandlogin.login.forgot-password" />
            </a> */}
          </div>
          <Submit loading={submitting}>
            登录
          </Submit>
          {/* <div className={styles.other}>
            <FormattedMessage id="userandlogin.login.sign-in-with" />
            <AlipayCircleOutlined className={styles.icon} />
            <TaobaoCircleOutlined className={styles.icon} />
            <WeiboCircleOutlined className={styles.icon} />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="userandlogin.login.signup" />
            </Link>
          </div> */}
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
