import React, {ReactNode} from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import {isAndroid, scale} from '../../utils/platformUtils';

import {
  fontFamily as fontFamilyConstant,
  color as colorConstant,
} from '../../styles';

export const FONT_FAMILY = {
  BOLD: 'Bold',
  DEMI: 'Demi',
  ITALIC: 'Italic',
  REGULAR: 'Regular',
  SEMIBOLD: 'Semibold',
  MEDIUM: 'Medium',
} as const;

export type FontFamilyType = (typeof FONT_FAMILY)[keyof typeof FONT_FAMILY];

type FontFamilyNameType =
  (typeof fontFamilyConstant)[keyof typeof fontFamilyConstant];

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
  fontFamily?: FontFamilyType;
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

export const getFontFamily = (
  fontFamilyProp: FontFamilyType,
): FontFamilyNameType => {
  switch (fontFamilyProp) {
    case FONT_FAMILY.BOLD:
      return fontFamilyConstant.urwdinBold;
    case FONT_FAMILY.DEMI:
      return fontFamilyConstant.urwdinCondDemi;
    case FONT_FAMILY.ITALIC:
      return fontFamilyConstant.urwdinItalic;
    case FONT_FAMILY.SEMIBOLD:
      return fontFamilyConstant.urwdinSemiCondBold;
    case FONT_FAMILY.MEDIUM:
      return fontFamilyConstant.urwdinMedium;
    default:
      return fontFamilyConstant.urwdinRegular;
  }
};

const StyledText = styled.Text<IText>`
  font-family: ${({fontFamily = FONT_FAMILY.REGULAR}) =>
    getFontFamily(fontFamily)};
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
  padding-top: ${({fixedSize = 0, size = SIZE.NORMAL}) =>
    isAndroid() ? 0 : (fixedSize || getFontSize(size)) * 0.25}px;
  text-align-vertical: center;
`;

const Text = ({children, ...rest}: IText): JSX.Element => (
  <StyledText {...rest}>{children}</StyledText>
);

export default Text;
