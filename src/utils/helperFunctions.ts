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

//

// const executeCMDAsync = (
//   cmd: string
// ): Promise<{
//   success: boolean;
//   stdout: string;
//   stderr: string;
//   error: ExecException | null;
// }> => {
//   return new Promise<any>((resolve, reject) => {
//     exec(cmd, (error, stdout, stderr) => {
//       console.log(error, stderr, stdout);
//       if (error || stderr) {
//         reject({
//           success: false,
//           stdout,
//           stderr,
//           error,
//         });
//       }

//       resolve({
//         success: true,
//         stdout,
//         stderr,
//         error,
//       });
//     });
//   });
// };

// const sudoExecuteCMDAsync = async (cmd: string, pswd: string) => {
//   return executeCMDAsync(`echo "${pswd}" | sudo -S ${cmd}`);
// };

// export const isSaltMasterInstalled = async () => {
//   try {
//     return !!(await executeCMDAsync('salt-master --version'));
//   } catch (error: any) {
//     console.log(error.message);
//     return false;
//   }
// };

// export const installSaltMaster = async (password: string) => {
//   try {
//     await executeCMDAsync(
//       'curl -o bootstrap-salt.sh -L https://bootstrap.saltproject.io'
//     );
//   } catch (err) {
//     console.error(err);
//   }
//   console.log('running 2 ');

//   try {
//     await sudoExecuteCMDAsync(
//       'sh bootstrap-salt.sh -M -N git master',
//       password
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };
