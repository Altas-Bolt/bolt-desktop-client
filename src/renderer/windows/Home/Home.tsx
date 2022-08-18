// Import Modules
import { useState } from 'react';
import { Button, message } from 'antd';

// Import Utils
import { isSaltMasterInstalled } from 'utils/helperFunctions';

// Import Components
import InstallationModal from 'renderer/components/Home/InstallationModal';

// Import Styles
import { HomeWrapper } from './Home.styles';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [status, setStatus] = useState<
    'loading' | 'error' | 'success' | 'idle'
  >('idle');
  const navigate = useNavigate();
  const checkInstallation = async () => {
    setStatus('loading');
    const isInstalled = await isSaltMasterInstalled();

    if (isInstalled) {
      message.success('Installation Found');
      setStatus('success');
      navigate('/dashboard');
    } else {
      setStatus('error');
    }
  };

  return (
    <HomeWrapper>
      <div className="header">
        <h1>Bolt.</h1>
      </div>
      <div className="action">
        <Button
          type="primary"
          size="large"
          loading={status === 'loading'}
          onClick={checkInstallation}
        >
          Get Started
        </Button>
      </div>
      <InstallationModal status={status} setStatus={setStatus} />
    </HomeWrapper>
  );
};

export default Home;
