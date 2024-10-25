import React, {ReactNode} from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import {scale} from '../../utils/platformUtils';

import {color as colorConstant} from '../../styles';

export const FONT_WEIGHT = {
  BOLD: 'Bold',
  SEMIBOLD: 'Semibold',
  MEDIUM: 'Medium',
} as const;

export type FontWeightType = (typeof FONT_WEIGHT)[keyof typeof FONT_WEIGHT];

export const SIZE = {
  NORMAL: 'NORMAL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
  XLARGE: 'XLARGE',
  XXLARGE: 'XXLARGE',
  SMALL: 'SMALL',
  XSMALL: 'XSMALL',
} as const;
export type FontSizeType = (typeof SIZE)[keyof typeof SIZE];

export interface IText extends TextProps {
  children?: ReactNode;
  fontWeight?: FontWeightType;
  size?: FontSizeType;
  color?: string;
  isUppercase?: boolean;
  isUnderlined?: boolean;
  alignCenter?: boolean;
  horizontalMargin?: number;
  fixedSize?: number;
}

export const getFontSize = (sizeProp: FontSizeType): number => {
  const SIZE_BASE = 14;
  switch (sizeProp) {
    case SIZE.MEDIUM:
      return scale(SIZE_BASE + 1);
    case SIZE.LARGE:
      return scale(SIZE_BASE + 2);
    case SIZE.XLARGE:
      return scale(SIZE_BASE + 4);
    case SIZE.XXLARGE:
      return scale(SIZE_BASE + 6);
    case SIZE.SMALL:
      return scale(SIZE_BASE - 2);
    case SIZE.XSMALL:
      return scale(SIZE_BASE - 4);
    default:
      return scale(SIZE_BASE);
  }
};

export const getFontWeight = (fontFamilyProp: string): string => {
  switch (fontFamilyProp) {
    case FONT_WEIGHT.BOLD:
      return 'bold';
    case FONT_WEIGHT.SEMIBOLD:
      return '600';
    case FONT_WEIGHT.MEDIUM:
      return '500';
    default:
      return '400';
  }
};

const StyledText = styled.Text<IText>`
  font-weight: ${({fontWeight = FONT_WEIGHT.REGULAR}) =>
    getFontWeight(fontWeight)};
  font-size: ${({fixedSize = 0, size = SIZE.NORMAL}) =>
    fixedSize || getFontSize(size)}px;
  text-transform: ${({isUppercase = false}) =>
    isUppercase ? 'uppercase' : 'none'};
  text-align: ${({alignCenter = false}) => (alignCenter ? 'center' : 'left')};
  justify-content: center;
  color: ${({color = colorConstant.black}) => color};
  margin-horizontal: ${({horizontalMargin = 0}) => scale(horizontalMargin)}px;
  text-decoration: ${({isUnderlined = false}) =>
    isUnderlined ? 'underline' : 'none'};
  text-align-vertical: center;
`;

const Text = ({children, ...rest}: IText): JSX.Element => (
  <StyledText {...rest}>{children}</StyledText>
);

export default Text;
