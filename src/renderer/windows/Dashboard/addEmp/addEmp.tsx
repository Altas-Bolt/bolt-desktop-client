import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, DatePicker, Form, Input, message, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { api } from 'utils/api';
import { v4 as uuidv4 } from 'uuid';
import { setFlagsFromString } from 'v8';

const AddEmp = () => {
  const { data, error, isLoading } = useQuery(['minions'], () => {
    return api.get('/bolt/minions/all');
  });
  const addEmp = useMutation(
    ({ id }: { id: string }) =>
      api.put(`/minions/add-user/${id}`).then((res) => res.data),
    {
      onError: (err) => {
        console.error('[add emp tp minion]', err);
        message.error('Some error occured');
      },
      onSuccess: ({ data }) => {
        console.log(data);
        message.success(`minion added`);
      },
    }
  );

  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={(data) => {
          console.log('data', data);
          //           submit.mutate({
          // id:
          //           });
        }}
      >
        <Form.Item
          rules={[{ required: true }]}
          name="minion_id"
          label="Device Id"
        >
          {/* <Select> */}
          {(data?.data?.data || ['loading']).map((label: any) => {
            if (label === 'loading') {
              return (
                <Select.Option key={label} value={label}>
                  <LoadingOutlined />
                </Select.Option>
              );
            }
            return (
              <button
                onClick={() => addEmp.mutate({ id: label.saltId })}
                key={label.saltId}
              >
                {label.saltId}
              </button>
            );
          })}
          {/* </Select> */}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEmp;
