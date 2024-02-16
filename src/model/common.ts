export interface Point {
  x: number;
  y: number;
}

export enum EnumDirection {
  HORIZONTAL = 0,
  VERTICAL = 1,
  CROSS_UP = 2,
  CROSS_DOWN = 3,
}

export interface Difficulty {
  name: string;
  type: EnumDifficulty;
  row: number;
  col: number;
  word_count: number;
  len_count: number;
}

export enum EnumDifficulty {
  EASY,
  MEDIUM,
  HARD,
  EXTREME,
}

export interface Category {
  name: string;
  type: EnumCategory;
  words: string[];
  image: any;
}
export enum EnumCategory {
  NATURE,
  ANIMAL,
  FOOD,
  SPORT,
  VEGGIE_FRUIT,
  MUSIC,
  CHRISMAS,
  HALLOWEEN,
  EMOTION,
  EASTER,
  TECHNOLOGY,
  NATION,
  OCEAN,
  HOUSE,
  BIRD,
  TOY,
}
