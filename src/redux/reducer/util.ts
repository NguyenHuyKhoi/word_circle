import {ALL_LEVELS, CHAR_SIZES, CIRCLE_SIZES} from '@config';
import {
  CategoryEntity,
  CircleCharEntity,
  EnumDirection,
  PlayState,
  Point,
  WordEntity,
} from '@models';

export const calCharPosition = ({
  count,
  index,
  circle_radius,
  char_radius,
}: {
  count: number;
  index: number;
  circle_radius: number;
  char_radius: number;
}): Point => {
  const angle = ((Math.PI * 2) / count) * index;
  const inner_radius = circle_radius - char_radius;
  return {
    x: (Math.sin(angle) + 1) * inner_radius + char_radius,
    y: (1 - Math.cos(angle)) * inner_radius + char_radius,
  };
};
const calDistance = (p1: Point, p2: Point) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export const findNearestChar = ({chars}: PlayState, point: Point) => {
  var minDis = 10000000;
  var result = -1;
  chars.forEach(({pos, index}) => {
    const dis = calDistance(pos, point);
    if (dis < minDis) {
      result = index;
      minDis = dis;
    }
  });
  return result;
};
export const EMPTY_CHAR = ' ';

export const getCurrentWord = (
  chars: CircleCharEntity[],
  indexes: number[],
) => {
  return indexes.length === 0
    ? undefined
    : indexes.reduce((s, item) => (s += chars[item].char), '');
};
export const getDirectionPoint = (direction: EnumDirection) => {
  return direction === 0 ? {x: 1, y: 0} : {x: 0, y: 1};
};

export const unhideWord = (state: PlayState, index: number) => {
  var table = [...state.table];
  const {pos, value, direction} = state.words[index];
  for (var i = 0; i < value.length; i++) {
    const dp = getDirectionPoint(direction);
    var x1 = pos.x + dp.x * i;
    var y1 = pos.y + dp.y * i;
    table[y1][x1].solved = true;
  }
  return table;
};

export const getAnswerWord = (state: PlayState) => {
  const currentWord = getCurrentWord(state.chars, state.indexes);

  return (
    state.words?.findIndex((word: WordEntity) => {
      if (word.solved === true) {
        return false;
      }
      if (word.value === currentWord) {
        return true;
      }
      return false;
    }) ?? -1
  );
};

export const findCollapseChar = ({chars}: PlayState, point: Point) => {
  for (var i = 0; i < chars.length; i++) {
    const {pos} = chars[i];
    if (CHAR_SIZES[chars.length] / 2 >= calDistance(pos, point)) {
      return i;
    }
  }
  return -1;
};

export const isCompleteGame = (state: PlayState) => {
  return state.words?.find(item => !item.solved) === undefined;
};

export const setupGame = (category: CategoryEntity) => {
  const {win_levels, char_count} = category;
  const {chars, words, table}: any = (ALL_LEVELS as any[]).find(
    item => item.char_count === char_count,
  )!.levels[win_levels];
  const count = chars.length;
  const circle_size = CIRCLE_SIZES[count];
  const char_size = CHAR_SIZES[count];
  const newTable = table.map((row: string[][]) =>
    row.map(char => ({
      char,
      hinted: false,
      solved: false,
    })),
  );
  const state: any = {
    chars: chars.map((char: string[], index: number) => ({
      index,
      char,
      pos: calCharPosition({
        count,
        index,
        circle_radius: circle_size / 2,
        char_radius: char_size / 2,
      }),
    })),
    table: newTable,
    words,
  };
  return state;
};
