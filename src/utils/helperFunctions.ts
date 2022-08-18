// Import Modules
import { exec } from 'child_process';
import { readFile } from 'fs/promises';
import os from 'os';

export const isMac = () => os.platform() === 'darwin';

export const isLinux = () => os.platform() === 'linux';

export const getLinuxReleaseDetails = async () => {
  const res = await readFile('/etc/os-release', 'utf-8');

  const releaseDetails: Record<string, string> = {};

  res.split('\n').forEach((line) => {
    const words = line.split('=');
    releaseDetails[words[0].trim().toLowerCase()] = words[1].trim();
  });

  console.dir(releaseDetails);

  return releaseDetails;
};

const executeCMDAsync = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      console.log('error', error);
      console.log('stdout', stdout);
      console.log('stderr', stderr);

      if (error) reject(error);

      if (stderr) reject(stderr);

      resolve(stdout);
    });
  });
};

const executeSudoCMDAsync = (cmd: string, pwd: string) => {
  return new Promise((resolve, reject) => {
    exec(`echo ${pwd} | ${cmd}`, (error, stdout, stderr) => {
      if (error) reject(error);

      if (stderr) reject(stderr);

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
    const pwd = localStorage.getItem('pwd');

    if (!pwd) {
      throw new Error('Password not found');
    }

    if (isMac()) {
      await executeCMDAsync('brew install saltstack');
      await executeSudoCMDAsync('sudo -S mkdir /etc/salt', pwd).catch((err) =>
        console.error(err)
      );

      await executeSudoCMDAsync('sudo -S touch /etc/salt/master', pwd).catch(
        (err) => console.error(err)
      );
    } else if (isLinux()) {
      const releaseDetails = await getLinuxReleaseDetails();

      if (releaseDetails.id_like === 'debian') {
        await executeSudoCMDAsync(
          'sudo -S apt-get install salt-api salt-cloud salt-master salt-minion salt-ssh salt-syndic',
          pwd
        );
      } else if (releaseDetails.id_like === 'fedora') {
        await executeSudoCMDAsync(
          'sudo -S yum install salt-master salt-minion',
          pwd
        );
      } else {
        throw new Error('Unsupported Platform');
      }
    } else {
      throw new Error('Unsupported Platform');
    }
    return true;
  } catch (error: any) {
    console.log(error.message, error.stack);
    return false;
  }
};
