import {CategoryConfigs, DifficultyConfigs} from '@config';
import {
  EnumDirection,
  PlayState,
  Point,
  TableConfig,
  WordEntity,
} from '@models';
import {_screen_width} from '@utils';
import {clamp, sample, shuffle} from 'lodash';
export const EMPTY_CELL = '';
export const MAX_TRY_FILL_WORD = 200;
export const pointToCell = (
  p: Point | undefined,
  {col, row, cell_size}: TableConfig,
) => {
  if (p === undefined) {
    return undefined;
  }
  return {
    x: clamp(Math.floor(p.x / cell_size), 0, col - 1),
    y: clamp(Math.floor(p.y / cell_size), 0, row - 1),
  };
};

export const cellToPoint = (p: Point | undefined, {cell_size}: TableConfig) => {
  if (p === undefined) {
    return undefined;
  }

  return {
    x: (p.x + 0.5) * cell_size,
    y: (p.y + 0.5) * cell_size,
  };
};

// Function to check if a word can be placed in a certain direction
function canPlaceWord(
  table: string[][],
  x: number,
  y: number,
  word: string,
  direction: EnumDirection,
  table_config: TableConfig,
): boolean {
  const wordLength = word.length;

  for (let i = 0; i < wordLength; i++) {
    const dp = getDirectionPoint(direction);
    let y2 = y + dp.y * i;
    let x2 = x + dp.x * i;
    if (!insideTable({x: x2, y: y2}, table_config)) {
      return false;
    }

    if (table[y2][x2] !== EMPTY_CELL) {
      return false; // Cell is already occupied
    }
  }

  return true;
}

function randChar(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}
export const getColorWord = () => {
  const colors = [
    '#f9b6e2',
    '#ecf693',
    '#8ef68b',
    '#b6e8ec',
    '#ca9bf2',
    '#f6db5f',
    '#ffb554',
    '#fe5e51',
    '#36abb5',
    '#CAA6A6',
    '#FFE7E7',
    '#7BD3EA',
    '#FF9843',
    '#A1EEBD',
    '#3468C0',
    '#86A7FC',
  ];
  return sample(colors);
};
function fillWord(table: string[][], word: string, table_config: TableConfig) {
  const wordLength = word.length;

  let x, y;
  let direction =
    (sample(Object.values(EnumDirection)) as EnumDirection) ??
    EnumDirection.HORIZONTAL;
  var count = 0;
  var maxCount = MAX_TRY_FILL_WORD;

  const emptyCells: Point[] = [];
  table.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === EMPTY_CELL) {
        emptyCells.push({x: ci, y: ri});
      }
    });
  });
  do {
    const cell = sample(emptyCells);
    x = cell?.x ?? 0;
    y = cell?.y ?? 0;
    count++;
  } while (
    count <= maxCount &&
    !canPlaceWord(table, x, y, word, direction, table_config)
  );
  if (count >= maxCount) {
    return undefined;
  }

  for (let i = 0; i < wordLength; i++) {
    const dp = getDirectionPoint(direction);
    let x2 = x + dp.x * i;
    let y2 = y + dp.y * i;

    table[y2][x2] = word.charAt(i);
  }
  return {
    x,
    y,
    direction,
    value: word,
    solved: false,
    hinted: false,
  };
}

export const setupTable = (state: PlayState): PlayState => {
  const {difficulty, category} = state;

  const {word_count, len_count, row, col} = DifficultyConfigs.find(
    item => item.type === difficulty,
  )!;

  const cell_size = Math.floor((_screen_width * 0.95) / col);

  const {words} = CategoryConfigs.find(item => item.type === category)!;

  const validWords = shuffle(words.filter(item => item.length <= len_count));
  const tableWords = validWords
    .slice(0, Math.min(validWords.length, word_count))
    .map(item => item.toUpperCase());

  const table: string[][] = Array.from({length: row}, () =>
    Array(col).fill(EMPTY_CELL),
  );

  const table_config = {
    row,
    col,
    cell_size,
  };
  const hiddenWords = tableWords
    .map((word: string) => fillWord(table, word, table_config))
    .filter(item => item != null);

  table.forEach((itemRow, ri) =>
    itemRow.forEach((cell, ci) => {
      if (cell === EMPTY_CELL) {
        table[ri][ci] = randChar();
      }
    }),
  );

  return {
    table,
    table_config,
    difficulty,
    words: [...(hiddenWords as WordEntity[])],
  };
};

const getDirectionPoint = (direction: EnumDirection) => {
  return direction === EnumDirection.HORIZONTAL
    ? {x: 1, y: 0}
    : direction === EnumDirection.VERTICAL
    ? {x: 0, y: 1}
    : direction === EnumDirection.CROSS_UP
    ? {x: 1, y: -1}
    : {x: 1, y: 1};
};

export const getLinePxOfWord = (
  word: WordEntity,
  table_config: TableConfig,
) => {
  const [cell1, cell2] = getLineCellOfWord(word);
  return [cellToPoint(cell1, table_config), cellToPoint(cell2, table_config)];
};

const getLineCellOfWord = (word: WordEntity) => {
  const p1 = {y: word.y, x: word.x};
  const px = getDirectionPoint(word.direction);

  const len = word.value.length;
  const p2 = {
    x: p1.x + px.x * (len - 1),
    y: p1.y + px.y * (len - 1),
  };
  return [p1, p2];
};

export const getHiddenWord = (state: PlayState) => {
  const {cell1, cell2, table} = state;
  if (!cell1 || !cell2 || !table) {
    return -1;
  }

  return (
    state.words?.findIndex((word: WordEntity) => {
      if (word.solved === true) {
        return false;
      }
      const [p1, p2] = getLineCellOfWord(word);

      if (
        cell1.x === p1.x &&
        cell1.y === p1.y &&
        cell2.x === p2.x &&
        cell2.y === p2.y
      ) {
        return true;
      }
      return false;
    }) ?? -1
  );
};

export const insideTable = (p: Point, {col, row}: TableConfig) => {
  return p.x >= 0 && p.x < col && p.y >= 0 && p.y < row;
};

export const normalizeCell = (
  p1: Point,
  p2: Point,
  table_config: TableConfig,
) => {
  const tx = [-1, -1, -1, 0, 0, 1, 1, 1];
  const ty = [-1, 0, 1, -1, 1, -1, 0, 1];
  const dis = Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));

  var result = p2;
  var minDis = 1000;
  tx.map((_, i) => ({
    x: p1.x + dis * tx[i],
    y: p1.y + dis * ty[i],
  }))
    .filter((p: Point) => insideTable(p, table_config))
    .forEach((p: Point) => {
      const cDis = Math.abs(p2.x - p.x) + Math.abs(p2.y - p.y);
      if (cDis <= minDis) {
        result = p;
        minDis = cDis;
      }
    });
  return result;
};

export const isCompleteGame = (state: PlayState) => {
  return state.words?.find(item => item.solved === false) === undefined;
};

export const getSelectWord = (state: PlayState) => {
  const {table, cell1, cell2} = state;
  if (!table || !cell1 || !cell2) {
    return undefined;
  }
  const dis = Math.max(
    Math.abs(cell1.x - cell2.x),
    Math.abs(cell1.y - cell2.y),
  );
  const tx = cell1.x < cell2.x ? 1 : cell1.x > cell2.x ? -1 : 0;
  const ty = cell1.y < cell2.y ? 1 : cell1.y > cell2.y ? -1 : 0;
  var word = '';
  for (var i = 0; i <= dis; i++) {
    word += table[cell1.y + ty * i][cell1.x + tx * i];
  }
  return word;
};
