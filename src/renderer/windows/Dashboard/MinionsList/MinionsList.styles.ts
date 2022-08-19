/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { blue, green, grey, red } from '@ant-design/colors';
import styled from 'styled-components';
import { SelectedMinionListType } from './MinionsList';

export const MinionsListWrapperDiv = styled.div``;

export const getOptionColor = (
  status: SelectedMinionListType,
  { index }: { index: 'primary' | number } = { index: 'primary' }
) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return green[index];
    case 'rejected':
      return red[index];
    case 'requested':
      return grey[index];
    case 'all':
    default:
      return blue[index];
  }
};

export const FilterText = styled.a<{
  selectedOption: SelectedMinionListType;
}>`
  color: ${({ selectedOption }) => getOptionColor(selectedOption)};
`;
