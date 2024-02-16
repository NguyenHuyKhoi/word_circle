import {useSelector} from '@common';
import {Point} from '@models';
import React, {FC} from 'react';
import {Circle, Line as SvgLine} from 'react-native-svg';

interface Props {
  p1: Point;
  p2: Point;
  color: string;
}
export const Line: FC<Props> = ({p1, p2, color}) => {
  const {table_config} = useSelector(x => x.play);
  const lineWidth = (table_config?.cell_size ?? 1) * 0.7;
  return (
    <>
      <SvgLine
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke={color}
        strokeWidth={lineWidth}
      />

      <Circle cx={p1.x} cy={p1.y} r={lineWidth / 2} fill={color} />
      <Circle cx={p2.x} cy={p2.y} r={lineWidth / 2} fill={color} />
    </>
  );
};
