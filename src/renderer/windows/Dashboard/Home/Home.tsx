import { ProfileOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import { useAuth } from 'renderer/context/authContext';
import { getIpAddress } from 'utils/helperFunctions';
import { HomeLayout } from './Home.styles';

const AlertCard = ({ day, date, flag, email, softwareName }) => {
  return (
    <div className="alert-card">
      <div className="tag">
        <p className="day">{day}</p>
        <p className="date">{date}</p>
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
        <Button icon={<UserDeleteOutlined />}>Logout Employee</Button>
      </div>
    </div>
  );
};

const Home = () => {
  const auth = useAuth();

  return (
    <HomeLayout>
      <h1 className="heading">Home</h1>
      <div className="header">
        <div className="recents-wrapper">
          <h2>Recent Alerts</h2>
          <div className="cards-grid">
            <AlertCard
              day={'Mon'}
              date={'26'}
              flag="blacklisted"
              email={'aniket.biswas75@gmail.com'}
              softwareName={'PUBG'}
            />
            <AlertCard
              day={'Tue'}
              date={'27'}
              flag="blacklisted"
              email={'rishabh@gmail.com'}
              softwareName={'DOS'}
            />
            <AlertCard
              day={'Wed'}
              date={'28'}
              flag="blacklisted"
              email={'sjain@gmail.com'}
              softwareName={'Instagram'}
            />
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