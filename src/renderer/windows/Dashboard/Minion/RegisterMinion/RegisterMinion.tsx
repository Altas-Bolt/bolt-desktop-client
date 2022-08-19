import { Button, Form, Input, PageHeader } from 'antd';
import React from 'react';
import { RegisterMinionWrapper } from './RegisterMinion.styles';

interface RegisterMinionProps {}

export const RegisterMinion: React.FC<RegisterMinionProps> = ({}) => {
  const onFinish = () => {
    console.log('');
  };

  return (
    <RegisterMinionWrapper>
      <div>
        <h1></h1>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Register a minion device"
          backIcon={null}
        />
      </div>
      <div className="formSection">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="ipv4"
            name="ipv4"
            rules={[
              { required: true, message: 'Please input the minion ipv4!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="OS"
            name="OS"
            rules={[{ required: true, message: 'Please input the minion OS!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RegisterMinionWrapper>
  );
};
