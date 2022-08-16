// Import Modules
import { exec } from 'child_process';
import path from 'path';

const executeCMDAsync = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) reject(error || stderr);

      resolve(stdout);
    });
  });
};

export const isSaltMasterInstalled = async () => {
  try {
    return !!(await executeCMDAsync('salt-master --version'));
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export const installSaltMaster = async () => {
  try {
    // ! TODO Fix this
    const scriptPath = path.resolve(
      __dirname,
      'scripts',
      'install-salt-master.sh'
    );

    await executeCMDAsync(`chmod +x ${scriptPath}`);

    await executeCMDAsync(`bash ${scriptPath}`);

    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};
