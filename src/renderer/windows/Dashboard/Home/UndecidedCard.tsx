import { blue } from '@ant-design/colors';
import {
  AlertOutlined,
  CheckOutlined,
  StopOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Popover } from 'antd';
import { useAppContext } from 'renderer/context/appContext';
import {
  FlagEnum,
  NewTypeSoftwareNotificationResolutionsEnum,
} from 'types/types';
import { api } from 'utils/api';

//@ts-ignore
export const UndecidedCard = ({ flag, email, softwareName, id, ip }) => {
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
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                NewTypeSoftwareNotificationResolutionsEnum.WHITELISTED,
              resolvedBy: user?.id as string,
              terminalState: FlagEnum.WHITELISTED,
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <CheckOutlined /> Whitelist Software
        </div>
      </p>
       
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED,
              resolvedBy: user?.id as string,
              terminalState: FlagEnum.BLACKLISTED,
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <StopOutlined /> Blacklist Software
        </div>
      </p>
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED_AND_LOGOFFED,
              resolvedBy: user?.id as string,
              terminalState: FlagEnum.BLACKLISTED,
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <StopOutlined />{' '}
          {NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED_AND_LOGOFFED}
        </div>
      </p>
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED_AND_NOTIFIED,
              resolvedBy: user?.id as string,
              terminalState: FlagEnum.BLACKLISTED,
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <StopOutlined />{' '}
          {NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED_AND_NOTIFIED}
        </div>
      </p>
      <p>
        <div
          onClick={() => {
            resolveMutation.mutate({
              id,
              resolution:
                NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED_AND_UNINSTALLED,
              resolvedBy: user?.id as string,
              terminalState: FlagEnum.BLACKLISTED,
            });
          }}
          style={{ color: blue.primary!, cursor: 'pointer' }}
        >
          <StopOutlined />{' '}
          {
            NewTypeSoftwareNotificationResolutionsEnum.BLACKLISTED_AND_UNINSTALLED
          }
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
          <p>
            {email}
            <br />
            {ip}
          </p>
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
