import {Point} from '@models';
import {COLORS} from '@themes';
import {sizes} from '@utils';
import React, {FC} from 'react';
import {Line as SvgLine} from 'react-native-svg';

interface Props {
  p1: Point;
  p2: Point;
}
export const Line: FC<Props> = ({p1, p2}) => {
  const lineWidth = sizes._8sdp;
  return (
    <>
      <SvgLine
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke={COLORS.BlueViolet}
        strokeWidth={lineWidth}
      />
    </>
  );
};
