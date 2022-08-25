import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, List, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MinionProfile } from 'renderer/components/MinionProfile';
import { IMinion } from 'types/types';
import { api } from 'utils/api';

const fake = [{ key: 'abc' }, { key: 'def' }, { key: 'ghi' }].map(
  ({ key }) => ({
    name: `app lis tname_${key}`,
    email: `app lis emiil_${key}`,
    ip: `app lis ip_${key}`,
  })
);
const MinionView: React.FC = () => {
  const [minion, setMinion] = useState<IMinion | null>(null);
  // const [scanMeta, setSacnMeta] = useState<IScanMinionSoftwaresTable | null>(
  //   null
  // );
  let { minion_key } = useParams(); //!fix
  minion_key = 'red-hat-minion';

  const getMinionBySaltId = useQuery(['minion', minion_key], () =>
    api.get(`/bolt/minions/getBySaltId/${minion_key}`).then((res) => res.data)
  );

  const getScanDataMuatation = useMutation(
    ({ minionId, scanId }: { minionId: string; scanId: string }) =>
      api
        .post(`bolt/scans/info`, {
          minionId,
          scanId,
        })
        .then((res) => res.data)
  );
  // const getScan = useQuery(
  //   ['scan', scanMeta],
  //   () => {
  //     if (!scanMeta) return Promise.reject('No scanMeta');
  //     return api.get(`/bolt/minions/${minion.id}`).then((res) => res.data);
  //   },
  //   {
  //     enabled: scanMeta !== null,
  //   }
  // );

  useEffect(() => {
    if (getMinionBySaltId.data?.status === 200) {
      if (!getMinionBySaltId.data.data) {
        console.error('[GET MINION BY ID], no data field sent by server ');
        return;
      }
      setMinion(getMinionBySaltId.data.data);
      // getScanDataMuatation.mutate({
      //   minionId: getMinionBySaltId.data.data.id,
      //   scanId:
      // });
    }
    console.log(getMinionBySaltId.data);
  }, [getMinionBySaltId]);

  // useEffect(() => {
  //   console.log('getScanData', getScanData.data);
  //   if (getMinionBySaltId.data?.status === 200) {
  //     setSacnMeta(getScanData.data.data);
  //   }
  // }, [getScanData]);
  const loading = getMinionBySaltId.isLoading;

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <MinionProfile />
      <List
        className="demo-loadmore-list"
        // loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={fake}
        renderItem={(item) => (
          <List.Item actions={[<Button>Remove</Button>]}>
            {/* <Skeleton avatar title={false} loading={item.loading} active> */}
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              title={`${minion_key}--${item.name}`}
              description={item.ip}
            />
            <div>{item.email}</div>
            {/* </Skeleton> */}
          </List.Item>
        )}
      />
    </div>
  );
};
export default MinionView;
