import { Avatar } from 'antd';
import React from 'react';
import { MinionProfileWrapper } from './MinionProfile.styles';

export const MinionProfile: React.FC = () => {
  return (
    <MinionProfileWrapper>
      <div className="container">
        <Avatar size={128} src={'https://picsum.photos/500/500'} />
        <div className="info_container">
          <div>
            <h1 className="name">Rishabh Jain</h1>
          </div>
          <div className="info">
            <div className="section">
              <h1 className="id">ID: SALT_ID_@#YTQ@U#@Y</h1>
              <h1 className="ip">IPV4: 172.172.11.11</h1>
            </div>
            <div className="section">
              <h1>Role: developer</h1>
              <h1>Email: rishabh@gmail.com</h1>
            </div>
          </div>
        </div>
      </div>
    </MinionProfileWrapper>
  );
};
