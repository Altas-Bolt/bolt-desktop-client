export type EmpRole = 'Developer' | 'Accountant';

export type User = {
  email: string;
  id: string;
};
export enum OSEnum {
  LINUX = 'linux',
  WINDOWS = 'windows',
}
export interface IMinion {
  id: string;
  os: OSEnum;
  ip: string;
  userId: string | null;
  createdBy: string;
  saltId: string;
}
export enum FlagEnum {
  BLACKLISTED = 'blacklisted',
  WHITELISTED = 'whitelisted',
  UNDECIDED = 'undecided',
}

export interface IScanMinionSoftwaresTable {
  id: string;
  created_at: Date;
  scan_id: string;
  minion_id: string;
  software_id: string;
  ran_at: Date;
  flag: FlagEnum;
}

export interface IMinionAppListItem {
  id: string;
  flag: FlagEnum;
  minion_id: string;
  software_id: string;
  software_name: string;
  software_flag: FlagEnum;
  minion_saltId: string;
  minion_os: OSEnum;
  minion_ip: string;
  user_id: string;
  user_email: string;
  user_role: string;
}
export interface ISoftwareNotifications {
  id: string;
  created_at: Date;
  type: SoftwareNotificationTypesEnum;
  scan_id: string;
  minion_id: string;
  resolved_by: string;
  resolved: boolean;
  resolution_description: string;
  software_id: string;
}
export enum SoftwareNotificationTypesEnum {
  'BLACKLISTED' = 'blacklisted_software_found',
  'NEW' = 'new_software_found',
}
export enum NewTypeSoftwareNotificationResolutionsEnum {
  'BLACKLISTED' = 'blacklisted',
  'WHITELISTED' = 'whitelisted',
  'BLACKLISTED_AND_UNINSTALLED' = 'blacklisted and uninstalled',
  'BLACKLISTED_AND_NOTIFIED' = 'blacklisted and notified',
  'BLACKLISTED_AND_LOGOFFED' = 'blacklisted and logoffed',
}

export enum BlacklistedTypeSoftwareNotificationResolutionsEnum {
  'NOTIFIED' = 'notified',
  'LOGOFFED' = 'logoffed',
}
