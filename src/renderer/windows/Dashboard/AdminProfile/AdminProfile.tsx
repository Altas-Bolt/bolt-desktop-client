import { Avatar, Button } from 'antd';
import React from 'react';
import { useAppContext } from 'renderer/context/appContext';
import { useAuth } from 'renderer/context/authContext';
import { getIpAddress } from 'utils/helperFunctions';
import { AdminProfileWrapper } from './AdminProfile.styles';

interface AdminProfileProps {}

export const AdminProfile: React.FC<AdminProfileProps> = ({}) => {
  const auth = useAuth();
  const { user } = useAppContext();

  return (
    <AdminProfileWrapper>
      <div className="container">
        <div className="avatar">
          <Avatar
            style={{ minWidth: '128px' }}
            size={128}
            src={'https://picsum.photos/500/500'}
          />
        </div>

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
          <Button
            className="logoutBtn"
            onClick={() => {
              auth.signout();
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </AdminProfileWrapper>
  );
};
