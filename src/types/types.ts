import { ids } from 'webpack';

export type EmpRole = 'Developer' | 'Accountant';

// export interface Minion {
//   id: string;
//   ipv4: string;
//   os_version: string;
//   hardware_info: any; //! FIX

//   emp_name: string;
//   emp_email: string;
//   emp_role: EmpRole;
// }

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
