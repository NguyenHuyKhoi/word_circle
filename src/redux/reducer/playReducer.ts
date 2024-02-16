import {
  EnumCategory,
  EnumDifficulty,
  EnumGameStatus,
  PlayState,
  Point,
} from '@models';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  cellToPoint,
  getColorWord,
  getHiddenWord,
  getSelectWord,
  isCompleteGame,
  normalizeCell,
  pointToCell,
  setupTable,
} from './util';
import {COLORS} from '@themes';
import {shuffle} from 'lodash';
const initialState: PlayState = {};

const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialState,
  reducers: {
    onSelectDifficulty: (state, {payload}: PayloadAction<EnumDifficulty>) => {
      state.difficulty = payload;
    },
    onSelectCategory: (state, {payload}: PayloadAction<EnumCategory>) => {
      state.category = payload;
    },
    onSetOriginPoint: (state, {payload}: PayloadAction<Point>) => {
      state.origin = payload;
    },
    onUseHint: state => {
      if (!state.words) {
        return;
      }

      let indexes = state.words
        .map((item, index) =>
          item.hinted === false && item.solved === false ? index : undefined,
        )
        .filter(item => item !== undefined);
      if (indexes.length > 0) {
        let i = shuffle(indexes)[0]!;
        state.words[i] = {
          ...state.words[i],
          hinted: true,
        };
      }
    },
    onUseShowWord: state => {
      if (!state.words) {
        return;
      }
      let indexes = state.words
        .map((item, index) => (item.solved === false ? index : undefined))
        .filter(item => item !== undefined);
      if (indexes.length > 0) {
        let i = shuffle(indexes)[0]!;
        state.words[i] = {
          ...state.words[i],
          color: getColorWord() ?? '#ffffff',
          solved: true,
        };
      }
      if (isCompleteGame(state)) {
        state.status = EnumGameStatus.COMPLETE;
      }
    },
    onStartGame: state => {
      const newData = setupTable(state);
      state.table_config = newData.table_config;
      state.table = newData.table;
      state.words = newData.words;
      state.status = EnumGameStatus.PLAY;
    },
    onSelectCell: (state, {payload}: PayloadAction<Point>) => {
      const p = {
        x: payload.x - (state.origin?.x ?? 0),
        y: payload.y - (state.origin?.y ?? 0),
      };
      if (state.cell1 === undefined) {
        state.word_color = getColorWord();
        state.cell1 = pointToCell(p, state.table_config!);
        state.p1 = cellToPoint(state.cell1, state.table_config!);
      }
      state.cell2 = pointToCell(p, state.table_config!);
      if (state.cell1 && state.cell2) {
        state.cell2 = normalizeCell(
          state.cell1,
          state.cell2,
          state.table_config!,
        );
      }
      state.p2 = cellToPoint(state.cell2, state.table_config!);
      state.word = getSelectWord(state);
    },
    onReleaseCell: state => {
      const wordIndex = getHiddenWord(state);
      if (wordIndex !== -1 && state.words) {
        state.words[wordIndex].solved = true;
        state.words[wordIndex].color = state.word_color ?? COLORS.Lime;
      }
      if (isCompleteGame(state)) {
        state.status = EnumGameStatus.COMPLETE;
      }
      state.word = undefined;
      state.cell2 = undefined;
      state.cell1 = undefined;
      state.p1 = undefined;
      state.p2 = undefined;
    },
  },
});
const playReducer = slice.reducer;
export default playReducer;
export const {
  onSelectCell,
  onReleaseCell,
  onStartGame,
  onSelectCategory,
  onSelectDifficulty,
  onSetOriginPoint,
  onUseHint,
  onUseShowWord,
} = slice.actions;
