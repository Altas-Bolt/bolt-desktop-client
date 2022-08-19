import { useEffect, useState } from 'react';
import {
  fake,
  SelectedMinionListType,
} from 'renderer/windows/Dashboard/MinionsList/MinionsList';
import { getSaltKeys } from 'utils/helperFunctions';

const useMinionListHelper = () => {
  const [saltKeys, setSaltKeys] = useState<Record<string, string[]> | null>(
    null
  );
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'error' | 'success'
  >('idle');

  const getKeys = async () => {
    try {
      setStatus('loading');
      const keys = await getSaltKeys();
      setStatus('success');
      return keys;
    } catch (error: any) {
      console.log(error.message);
      setStatus('error');
      throw error;
    }
  };

  const setKeys = async () => {
    const keys = await getKeys();
    console.log(keys, 'keys');
    setSaltKeys(keys);
  };

  useEffect(() => {
    setKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterData = (
    data: typeof fake,
    memberStatus: SelectedMinionListType = 'All'
  ) => {
    if (memberStatus === 'All') return data;

    return data.filter((item) => item.status === status);
  };

  return {
    getKeys,
    filterData,
    status,
    setStatus,
    saltKeys,
  };
};

export default useMinionListHelper;
