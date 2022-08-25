import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message, PageHeader, Select } from 'antd';
import React, { useState } from 'react';
import { OSEnum } from 'types/types';
import { api } from 'utils/api';
import { RegisterMinionWrapper } from './RegisterMinion.styles';

interface RegisterMinionProps {}

export const RegisterMinion: React.FC<RegisterMinionProps> = ({}) => {
  const [minionId, setMinionId] = useState<string | null>(null);
  const registerMinionMutation = useMutation(
    ({ os, ip }: { os: keyof typeof OSEnum; ip: string }) =>
      api
        .post('/bolt/minions/create', {
          os,
          ip,
        })
        .then((res) => res.data),
    {
      onSuccess: ({ data }) => {
        message.success('minion registered successful');
        setMinionId(data.saltId);
      },
    }
  );

  const onFinish = ({ os, ip }: { os: keyof typeof OSEnum; ip: string }) => {
    console.log(os);
    registerMinionMutation.mutate({
      os,
      ip,
    });
  };

  return (
    <RegisterMinionWrapper>
      <div className="card">
        <div>
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
            layout="vertical"
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="ipv4"
              name="ip"
              style={{ width: '200px' }}
              rules={[
                { required: true, message: 'Please input the minion ipv4!' },
              ]}
            >
              <Input className="input" />
            </Form.Item>

            <Form.Item
              label="OS"
              name="os"
              rules={[
                { required: true, message: 'Please input the minion OS!' },
              ]}
            >
              <Select
                style={{ width: 400 }}
                // onChange={handleChange}
              >
                {Object.values(OSEnum).map((os: string) => (
                  <Select.Option key={os}>{os}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Button
              disabled={registerMinionMutation.isLoading}
              type="primary"
              htmlType="submit"
              style={{ width: 400, marginBottom: '50px' }}
            >
              {registerMinionMutation.isLoading ? 'Loading' : 'Submit'}
            </Button>
          </Form>
        </div>
        <div>{minionId && <h2>Minion Id: {minionId}</h2>}</div>
      </div>
    </RegisterMinionWrapper>
  );
};
