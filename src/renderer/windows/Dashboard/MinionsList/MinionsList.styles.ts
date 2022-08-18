/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { blue, green, grey, red } from '@ant-design/colors';
import styled from 'styled-components';
import { SelectedMinionListType } from './MinionsList';

export const MinionsListWrapperDiv = styled.div``;

export const getOptionColor = (status: SelectedMinionListType) => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return green.primary;
    case 'rejected':
      return red.primary;
    case 'requested':
      return grey.primary;
    case 'all':
    default:
      return blue.primary;
  }
};

export const FilterText = styled.a<{
  selectedOption: SelectedMinionListType;
}>`
  color: ${({ selectedOption }) => getOptionColor(selectedOption)};
`;
