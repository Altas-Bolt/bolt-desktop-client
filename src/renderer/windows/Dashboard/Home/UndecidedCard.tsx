import {
  DeleteOutlined,
  NotificationOutlined,
  LogoutOutlined,
  AlertOutlined,
  UserDeleteOutlined,
  CheckOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Popover, Button } from 'antd';
import { blue } from 'chalk';

export const UndecidedCard = ({ flag, email, softwareName }) => {
  const content = (
    <div>
      <p>
        <div
          onClick={() => {}}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <CheckOutlined /> Whitelist Software
        </div>
      </p>
       
      <p>
        <div
          onClick={() => {}}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <StopOutlined /> Blacklist Software
        </div>
      </p>
    </div>
  );

  return (
    <div className="undecided-card">
      <div className="icon">
        <AlertOutlined size={42} />
      </div>
      <div className="meta">
        <div className="data">
          <p className="key">Employee Email</p>
          <p>{email}</p>
        </div>
        <div className="data">
          <p className="key">Software Name</p>
          <p>{softwareName}</p>
        </div>
        <div className="data">
          <p className="key">Flag</p>
          <p>{flag}</p>
        </div>
      </div>
      <div className="action">
        <Popover placement="bottom" content={content} title="Actions">
          <Button icon={<UserDeleteOutlined />}>Actions</Button>
        </Popover>
      </div>
    </div>
  );
};
