import React, { createContext, useCallback, useState } from 'react';

type AppContextState = {
  password: string;
};
interface AppContextInterface {
  setPassword: (password: string) => void;
  runWithPass: (fn: Function) => void;
}
const initState: AppContextState = {
  password: '',
};
const AppContext = createContext<AppContextInterface | null>(null);

let passwordCallback: Function | null = null;

const passProvider: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
  const [state, setState] = useState<AppContextState>(initState);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const setPassword = useCallback(
    (password: string) => {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PASSWORD, 'password');
      setState((state) => ({ ...state, password }));
    },
    [setState]
  );

  const runWithPass = (fn: Function) => {
    if (!state.password) {
      setShowPasswordModal(true);
      passwordCallback = fn;
      console.log('saf2', passwordCallback);
      return;
    }
    fn(state.password);
  };
  console.log(showPasswordModal);
  return (
    <AppContext.Provider
      value={{
        runWithPass,
        setPassword,
      }}
    >
      <div>rt</div>
      {/* {showPasswordModal && <PasswordModal />} */}
      {children}
    </AppContext.Provider>
  );
};

// function useAppContext() {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within a AppContext');
//   }
//   return context;
// }
// export { AppProvider, useAppContext };

// const PasswordModal: React.FC = () => {
//   const [password, setPassword] = useState('');

//   const handleOk = () => {
//     console.log('pass', password);
//     console.log('pass', passwordCallback);
//   };
//   console.log('here01');
//   return (
//     <Modal
//       title="Bolt Installation Not Found"
//       visible={status === 'error'}
//       onOk={handleOk}
//       okButtonProps={{ disabled: !password }}
//       // onCancel={() => setStatus('idle')}//!
//     >
//       <p>
//         We could not find the installation for Bolt. Please install in order to
//         proceed.
//       </p>
//       <Input.Password
//         placeholder="Enter your sudo password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         iconRender={(visible) =>
//           visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//         }
//       />
//     </Modal>
//   );
// };
