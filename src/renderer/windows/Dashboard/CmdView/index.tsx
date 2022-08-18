import { Button, Input, message, Select, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
import { CmdViewLayout } from './CmdView.styles';

export enum SelectedMinionGroupsEnum {
  All = 'All',
  Developers = 'Developers',
  Accountants = 'Accountants',
  Custom = 'Custom',
}

export type SelectedMinionGroups = keyof typeof SelectedMinionGroupsEnum;

const CmdView: React.FC = ({}) => {
  const [selectedMinionGroups, setSelectedMinionGroups] = useState<
    SelectedMinionGroups[]
  >([]);
  const [selectMinionGroupError, setSelectMinionGroupError] = useState(false);
  const [customRegex, setCustomRegex] = useState('');
  const [cmd, setCmd] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleSelect = (key: SelectedMinionGroups) => {
    if (showCustom) return;
    if (key === SelectedMinionGroupsEnum.Custom) {
      setShowCustom(true);
      setSelectedMinionGroups(['Custom']);
    } else {
      setShowCustom(false);
      setSelectedMinionGroups([...selectedMinionGroups, key]);
    }
  };
  const handleClick = () => {
    if (selectedMinionGroups.length === 0) {
      setSelectMinionGroupError(true);
      message.error('Please select a group');
      return;
    }
    if (!cmd) message.error('Please enter a cmd');

    console.log('CMD RUN ', cmd);
  };
  return (
    <CmdViewLayout>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Select
          status={selectMinionGroupError ? 'error' : ''}
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Please select"
          onSelect={handleSelect}
          onDeselect={(key: string) => {
            if (key === SelectedMinionGroupsEnum.Custom) {
              setShowCustom(false);
              setSelectedMinionGroups([]);
            } else {
              setSelectedMinionGroups((value) => [
                ...value.filter((item) => item !== key),
              ]);
            }
          }}
          value={selectedMinionGroups}
        >
          {Object.keys(SelectedMinionGroupsEnum).map((opt, i) => (
            <Select.Option key={opt}>{opt}</Select.Option>
          ))}
        </Select>
        {showCustom ? (
          <Input
            value={customRegex}
            onChange={(e) => {
              setCustomRegex(e.target.value);
            }}
            placeholder="enter cutom regex"
          />
        ) : null}
        <div style={{ display: 'flex' }}>
          <Input
            onChange={(e) => setCmd(e.target.value)}
            value={cmd}
            placeholder="Enter Command"
          />
          <Button onClick={handleClick}>Run </Button>
        </div>

        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
      </Space>
    </CmdViewLayout>
  );
};

export default CmdView;
