import { ids } from 'webpack';

export type EmpRole = 'Developer' | 'Accountant';

export type Minion = {
  id: string;
  ipv4: string;
  os_version: string;
  hardware_info: any; //! FIX

  emp_name: string;
  emp_email: string;
  emp_role: EmpRole;
};
