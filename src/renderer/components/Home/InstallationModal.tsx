// Import Modules
import { message, Modal } from 'antd';
import { useState } from 'react';
import { installSaltMaster } from 'utils/helperFunctions';

interface IProps {
  status: 'loading' | 'error' | 'success' | 'idle';
  setStatus: React.Dispatch<
    React.SetStateAction<'loading' | 'error' | 'success' | 'idle'>
  >;
}

const InstallationModal: React.FC<IProps> = ({ status, setStatus }) => {
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      setLoading(true);
      await installSaltMaster();
    } catch (error: any) {
      message.error('Failed to Install');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Bolt Installation Not Found"
      visible={status === 'error'}
      onOk={handleOk}
      okText={loading ? 'Installing' : 'Install'}
      onCancel={() => setStatus('idle')}
    >
      <p>
        We could not find the installation for Bolt. Please install in order to
        proceed.
      </p>
    </Modal>
  );
};

export default InstallationModal;
