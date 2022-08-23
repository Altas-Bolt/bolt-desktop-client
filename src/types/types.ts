import { ids } from 'webpack';

export type EmpRole = 'Developer' | 'Accountant';

export interface Minion {
  id: string;
  ipv4: string;
  os_version: string;
  hardware_info: any; //! FIX

  emp_name: string;
  emp_email: string;
  emp_role: EmpRole;
}

export type User = {
  email: string;
  id: string;
};
