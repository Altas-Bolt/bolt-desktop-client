import { Input, Select, Space } from 'antd';
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

  const [showCustom, setShowCustom] = useState(false);

  const handleSelect = (key: SelectedMinionGroups) => {
    if (showCustom) return;
    // console.log(selected, selected.includes(SelectedMinionGroupsEnum.Custom));
    // if (selected.includes(SelectedMinionGroupsEnum.Custom)) {
    if (key === SelectedMinionGroupsEnum.Custom) {
      setShowCustom(true);
      setSelectedMinionGroups(['Custom']);
    } else {
      setShowCustom(false);
      setSelectedMinionGroups([...selectedMinionGroups, key]);
    }
  };

  return (
    <CmdViewLayout className="upper">
      <Input.Group>
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
        {showCustom ? <Input placeholder="enter cutom regex" /> : null}
      </Input.Group>
      <Input placeholder="Enter Command" />

      <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
    </CmdViewLayout>
  );
};

export default CmdView;
