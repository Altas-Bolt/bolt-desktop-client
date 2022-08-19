// Import Modules
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'renderer/context/authContext';

// Import Utils

// Import Components

// Import Styles
import { LoginWrapper } from './Login.styles';

const Login = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  const [status, setStatus] = useState<
    'loading' | 'error' | 'success' | 'idle'
  >('idle');
  const navigate = useNavigate();
  const auth = useAuth();

  // const handleGetStarted = async () => {
  //   setStatus('loading');
  //   const isInstalled = await isSaltMasterInstalled();

  //   if (isInstalled) {
  //     message.success('Installation Found');
  //     setStatus('success');
  //     navigate('/dashboard');
  //   } else {
  //     setStatus('error');
  //   }
  // };

  // if (!checkCompleted)
  //   return (
  //     <HomeWrapper>
  //       <Spin size="large" />
  //     </HomeWrapper>
  //   );

  useEffect(() => {
    console.log('here', auth.isSignedin());
    if (auth.isSignedin()) {
      navigate('/dashboard');
    }
  }, [auth]);

  const onFinish = (val: {
    username: string;
    password: string;
    remember?: boolean;
  }) => {
    // console.log('here', val);
    const success = auth.signin(val.username, val.password);
    // if(success){
    //   navigate('/dashboard')
    // }
  };
  return (
    <LoginWrapper>
      <div className="header">
        <h1>Bolt.</h1>
      </div>
      <div className="action">
        {/* <Button
          type="primary"
          size="large"
          loading={status === 'loading'}
          onClick={handleGetStarted}
        >
          Get Started
        </Button> */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
