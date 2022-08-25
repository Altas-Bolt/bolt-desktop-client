// Import Modules
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'renderer/context/authContext';

// Import Utils

// Import Components

// Import Styles
import { LoginWrapper } from './Login.styles';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isSignedin()) {
      navigate('/dashboard');
    }
  }, [auth]);

  const onFinish = (val: {
    username: string;
    password: string;
    remember?: boolean;
  }) => {
    auth.signin(val.username, val.password);
  };
  return (
    <LoginWrapper>
      <div className="header">
        <h1>Bolt.</h1>
      </div>
      <div className="action">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* <InstallationModal status={status} setStatus={setStatus} /> */}
    </LoginWrapper>
  );
};

export default Login;
