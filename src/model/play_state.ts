import {EnumDirection, Point} from './common';

export interface PlayState {
  worldPointer?: Point;
  circlePointer?: Point;
  indexes: number[];
  chars: CircleCharEntity[];
  table: CharEntity[][];
  words: WordEntity[];
  origin?: Point;
  status?: EnumGameStatus;
}

export interface WordEntity {
  value: string;
  solved: boolean;
  hinted: boolean;
  pos: Point;
  direction: EnumDirection;
  color: string;
}

export interface CharEntity {
  solved: boolean;
  hinted: boolean;
  char: string;
}

export interface CircleCharEntity {
  char: string;
  index: number;
  pos: Point;
}
export enum EnumGameStatus {
  PLAY,
  PAUSE,
  COMPLETE,
}
