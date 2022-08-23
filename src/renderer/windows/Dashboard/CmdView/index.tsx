import { useMutation } from '@tanstack/react-query';
import { Input, message, Select, Space } from 'antd';
import React, { useState } from 'react';
import { ReactTerminal, TerminalContextProvider } from 'react-terminal';
import { api } from 'utils/api';
import { CmdViewLayout } from './CmdView.styles';
// import Terminal from 'terminal-in-react';
const FAKE_minionGroups = {
  All: 'All',
  Developers: 'Developers',
  Accountants: 'Accountants',
  Custom: 'Custom',
};

const CmdView: React.FC = ({}) => {
  const [selectedMinionGroups, setSelectedMinionGroups] = useState<string[]>(
    []
  );
  const [selectMinionGroupError, setSelectMinionGroupError] = useState(false);
  const [customRegex, setCustomRegex] = useState('');
  const [customSelected, setCustomSelected] = useState(false);
  const [allSelected, setAllSelected] = useState(false);

  const runCmdApi = useMutation(
    ({ saltIds, cmd }: { saltIds: string[]; cmd: String }) =>
      api
        .post('/api/salt/run-cmd', {
          saltIds,
          cmd,
        })
        .then((res) => res.data),
    {
      onSuccess(data) {
        console.log('DATA', data);
      },
      onError(err) {
        console.error('[RUN CMD ]', err);
      },
    }
  );

  const handleSelect = (key: string) => {
    console.log(allSelected);
    console.log(customSelected);
    console.log(key);
    console.log(selectedMinionGroups);
    if (key === 'Custom') {
      setCustomSelected(true);
      setAllSelected(false);
      setSelectedMinionGroups(['Custom']);
      return;
    } else if (key === 'All') {
      setCustomSelected(false);
      setAllSelected(true);
      setSelectedMinionGroups(['All']);
      return;
    }
    if (customSelected || allSelected) return;

    setSelectedMinionGroups([...selectedMinionGroups, key]);
  };

  const handleDeselect = (key: string) => {
    console.log(allSelected);
    console.log(customSelected);
    console.log(key);
    console.log(selectedMinionGroups);
    if (key === 'Custom') {
      setCustomSelected(false);
      setSelectedMinionGroups([]);
    }
    if (key === 'All') {
      setAllSelected(false);
      setSelectedMinionGroups([]);
    } else {
      setSelectedMinionGroups((value) => [
        ...value.filter((item) => item !== key),
      ]);
    }
  };

  const handleRun = (cmd: string) => {
    if (selectedMinionGroups.length === 0) {
      setSelectMinionGroupError(true);
      message.error('Please select a group');
      return;
    }
    runCmdApi.mutate({
      cmd,
      saltIds: ['pop-os.localdomain'], //! fix set acc to selected group
    });
    console.log('CMD RUN ', cmd);
  };
  return (
    <CmdViewLayout>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          status={selectMinionGroupError ? 'error' : ''}
          mode="multiple"
          style={{ width: '100%', maxWidth: '200px' }}
          placeholder="Please select"
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          value={selectedMinionGroups}
        >
          {Object.keys(FAKE_minionGroups).map((opt) => (
            <Select.Option key={opt}>{opt}</Select.Option>
          ))}
        </Select>
        {customSelected ? (
          <Input
            value={customRegex}
            onChange={(e) => {
              setCustomRegex(e.target.value);
            }}
            placeholder="enter cutom regex"
          />
        ) : null}
        {/* <div style={{ display: 'flex' }}>
          <Input
            onChange={(e) => setCmd(e.target.value)}
            value={cmd}
            placeholder="Enter Command"
          />
          <Button onClick={handleClick}>Run </Button>
        </div> */}
        <TerminalContextProvider>
          <div style={{ height: '800px' }}>
            <ReactTerminal
              defaultHandler={(e: string) => {
                handleRun(e);
              }}
              showControlBar={false}
              commands={{ abb: 'abc' }}
              style={{ height: '500px' }}
              themes={{
                myCustomTheme: {
                  themeBGColor: '#272B36',
                  themeToolbarColor: '#DBDBDB',
                  themeColor: '#FFFEFC',
                  themePromptColor: '#a917a8',
                },
              }}
              theme="myCustomTheme"
            />
          </div>
        </TerminalContextProvider>
        {/* <Terminal
          color="green"
          backgroundColor="black"
          barColor="black"
          style={{ fontWeight: 'bold', fontSize: '1em' }}
          // commands={{
          //   'open-google': () => window.open('https://www.google.com/', '_blank'),
          //   showmsg: this.showMsg,
          //   popup: () => alert('Terminal in React')
          // }}
          descriptions={{
            'open-google': 'opens google.com',
            showmsg: 'shows a message',
            alert: 'alert',
            popup: 'alert',
          }}
          msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
        /> */}
        {/* <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} /> */}
      </Space>
    </CmdViewLayout>
  );
};

export default CmdView;
