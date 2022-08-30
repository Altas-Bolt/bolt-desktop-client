import { useMutation } from '@tanstack/react-query';
import { Input, message, Select, Space } from 'antd';
import React, { useState } from 'react';
import Terminal from 'terminal-in-react';
import { api } from 'utils/api';
import { CmdOutputWrapper, CmdViewLayout } from './CmdView.styles';
const FAKE_minionGroups = {
  All: 'All',
  Developers: 'Developers',
  Accountants: 'Accountants',
  Custom: 'Custom',
};

const PS: React.FC = ({}) => {
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
      setCustomRegex('');
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

  const handleRun = (cmdArray: string[], print: (val: any) => void) => {
    if (selectedMinionGroups.length === 0) {
      setSelectMinionGroupError(true);
      message.error('Please select a group');
      return;
    }

    const saltIds: string[] = []; // ['red-hat-minion'], //! fix set acc to selected group
    if (selectedMinionGroups[0] === 'All') {
      saltIds.push('*');
    } else if ((selectedMinionGroups[0] = 'Custom')) {
      saltIds.push(customRegex);
    } else {
      //! fix
    }

    print(<h1 style={{ background: 'black', color: 'green' }}>Loading</h1>);
    runCmdApi.mutate(
      {
        cmd: cmdArray.join(' '),
        saltIds,
      },
      {
        onSuccess: (data) => {
          console.log('data', data);
          print(
            <CmdOutputWrapper>
              {Object.keys(data.data).map((key) => (
                <div>
                  <h1 className="cmdOutput cmdOutputHead">{key}</h1>
                  <div>
                    {data.data[key].map((item: string) => (
                      <h1 className="cmdOutput">{item}</h1>
                    ))}
                  </div>
                </div>
              ))}
            </CmdOutputWrapper>
          );
        },
      }
    );

    // console.log('output', output);

    console.log('CMD RUN ', cmdArray.join(' '));
  };
  return (
    <CmdViewLayout>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Terminal
          startState="maximised"
          hideTopBar={true}
          color="green"
          backgroundColor="black"
          barColor="black"
          style={{ fontWeight: 'bold', fontSize: '1em', overflow: 'hidden' }}
          //@ts-ignore
          commandPassThrough={handleRun}
          msg="Enter cmd below"
        />
      </Space>
    </CmdViewLayout>
  );
};

export default PS;
