import {isNumber} from 'lodash';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text as RNText, TextProps} from 'react-native';
interface Props extends TextProps {
  style: any;
  children: string | number;
}
export const Text: FC<Props> = ({style, children, ...other}) => {
  const {t} = useTranslation();

  return (
    <RNText style={style} {...other}>
      {isNumber(children) ? children : t(children)}
    </RNText>
  );
};
