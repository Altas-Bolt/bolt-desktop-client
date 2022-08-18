/* eslint-disable import/prefer-default-export */
import { blue, green, grey, red } from '@ant-design/colors';
import styled from 'styled-components';
import { SelectedMinionListType } from './MinionsList';

export const MinionsListWrapperDiv = styled.div``;

export const FilterText = styled.a<{
  selectedOption: SelectedMinionListType;
}>`
  color: ${({ selectedOption }) => {
    switch (selectedOption) {
      case 'Accepted':
        return green.primary;
      case 'Rejected':
        return red.primary;
      case 'Requested':
        return grey.primary;
      case 'All':
      default:
        return blue.primary;
    }
  }};
`;
