import { blue } from '@ant-design/colors';
import {
  AlertOutlined,
  DeleteOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Button, Popover } from 'antd';
import { useEffect } from 'react';
import { useAppContext } from 'renderer/context/appContext';
import { useAuth } from 'renderer/context/authContext';
import {
  BlacklistedTypeSoftwareNotificationResolutionsEnum,
  ISoftwareNotifications,
} from 'types/types';
import { api } from 'utils/api';
import { getIpAddress } from 'utils/helperFunctions';
import { HomeLayout } from './Home.styles';

const AlertCard = ({ flag, email, softwareName, id }) => {
  const resolveMutation = useMutation(
    ({
      id,
      resolvedBy,
      terminalState,
      resolution,
    }: {
      id: string;
      resolvedBy: string;
      terminalState: string;
      resolution: string;
    }) =>
      api
        .post('/bolt/notifications/softwares/resolve', {
          id,
          resolvedBy,
          terminalState,
          resolution,
        })
        .then((res) => res.data),
    {
      // enabled: false, //! FIX
      onError: (err) => {
        console.error('[get notifications]', err);
      },
    }
  );
  const { user } = useAppContext();

  const content = (
    <div>
      {/* <p>
        <div
        
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <DeleteOutlined /> Uninstall software
        </div>
      </p> */}
       
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                BlacklistedTypeSoftwareNotificationResolutionsEnum.NOTIFIED,
              resolvedBy: user?.id as string,
              terminalState: 'nkjdnc',
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <NotificationOutlined /> Uninstall and notify
        </div>
      </p>
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                BlacklistedTypeSoftwareNotificationResolutionsEnum.LOGOFFED,
              resolvedBy: user?.id as string,
              terminalState: 'nkjdnc',
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <LogoutOutlined /> Logout employee
        </div>
      </p>
    </div>
  );

  return (
    <div className="alert-card">
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

const Home = () => {
  const auth = useAuth();

  const { data, isLoading, error } = useQuery(
    ['notifications'],
    () =>
      api
        .get(
          '/bolt/notifications/softwares/get?resolve=false&limit=1000&offset=0'
        )
        .then((res) => res.data),
    {
      // enabled: false, //! FIX
      refetchInterval: 1000,
      onError: (err) => {
        console.error('[get notifications]', err);
      },
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <HomeLayout>
      <h1 className="heading">Home</h1>
      <div className="header">
        <div className="recents-wrapper">
          <h2>Recent Alerts</h2>
          <div className="cards-grid">
            {data &&
              data.data.map((item: any) => {
                return (
                  <AlertCard
                    id={item.id}
                    flag={item.software_flag}
                    email={item.user_email}
                    softwareName={item.software_name}
                  />
                );
              })}
            {/* <AlertCard
              flag="blacklisted"
              email={'rishabh@gmail.com'}
              softwareName={'DOS'}
            />
            <AlertCard
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            />
            <AlertCard
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            />
            <AlertCard
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            />
            <AlertCard
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            />
            <AlertCard
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            />
            <AlertCard
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            /> */}
          </div>
        </div>
        <div className="card-wrapper">
          <h2>My Profile</h2>
          <div className="container">
            <Avatar
              style={{ minWidth: '128px' }}
              size={128}
              src={'https://picsum.photos/500/500'}
            />
            <div className="section">
              <div className="info_container">
                <div className="info">
                  <h1>Rishabh Jain</h1>
                  <h1>ID: 8b36311a</h1>
                  <h1>IPV4: {getIpAddress()}</h1>
                  <h1>Role: Admin</h1>
                  <h1>Email: rishabh@gmail.com</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
