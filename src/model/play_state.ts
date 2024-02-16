import {EnumCategory, EnumDifficulty, EnumDirection, Point} from './common';

export interface PlayState {
  origin?: Point;
  p1?: Point;
  cell1?: Point;
  p2?: Point;
  cell2?: Point;
  table?: string[][];
  word?: string;
  words?: WordEntity[];
  word_color?: string;
  status?: EnumGameStatus;
  difficulty?: EnumDifficulty;
  category?: EnumCategory;
  table_config?: TableConfig;
}
export interface TableConfig {
  row: number;
  col: number;
  cell_size: number;
}
export enum EnumGameStatus {
  PLAY,
  PAUSE,
  COMPLETE,
}

export interface WordEntity {
  value: string;
  solved: boolean;
  hinted: boolean;
  x: number;
  y: number;
  direction: EnumDirection;
  color: string;
}
