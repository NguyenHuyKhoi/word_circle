import {CategoryEntity, EnumGameStatus, PlayState, Point} from '@models';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  EMPTY_CHAR,
  findCollapseChar,
  findNearestChar,
  getAnswerWord,
  isCompleteGame,
  setupGame,
  unhideWord,
} from './util';
import {shuffle} from 'lodash';
const initialState: PlayState = {
  indexes: [],
  chars: [],
  table: [],
  words: [],
};

const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialState,
  reducers: {
    onSetupGame: (state, {payload}: PayloadAction<CategoryEntity>) => {
      const newData = setupGame(payload);

      state.chars = [...newData.chars];
      state.table = [...newData.table];
      state.words = [...newData.words];
      state.indexes = [];
      state.status = EnumGameStatus.PLAY;
    },
    onUseHint: state => {
      var valids = [];
      for (var i = 0; i < state.table.length; i++) {
        for (var j = 0; j < state.table[0].length; j++) {
          const cell = state.table[i][j];
          if (cell.char !== EMPTY_CHAR && !cell.solved && !cell.hinted) {
            valids.push({x: j, y: i});
          }
        }
      }
      if (valids.length > 0) {
        let point = shuffle(valids)[0]!;
        state.table[point.y][point.x].hinted = true;
      }
    },

    onUseShowWord: state => {
      if (!state.words) {
        return;
      }
      let indexes = state.words
        .map((item, index) => (!item.solved ? index : undefined))
        .filter(item => item !== undefined);
      if (indexes.length > 0) {
        let i = shuffle(indexes)[0]!;
        state.words[i].solved = true;
        state.table = unhideWord(state, i);
      }
      if (isCompleteGame(state)) {
        state.status = EnumGameStatus.COMPLETE;
      }
    },
    onSetOriginPoint: (state, {payload}: PayloadAction<Point>) => {
      state.origin = payload;
    },
    onGestureRelease: state => {
      const solveIndex = getAnswerWord(state);
      if (solveIndex !== -1) {
        state.words[solveIndex].solved = true;
        state.table = unhideWord(state, solveIndex);
      }
      if (isCompleteGame(state)) {
        state.status = EnumGameStatus.COMPLETE;
      }
      state.indexes = [];
    },
    onGestureMove: (state, {payload}: PayloadAction<Point>) => {
      // If no char is selected => find nearest char and select
      state.worldPointer = payload;
      const p = {
        x: payload.x - (state.origin?.x ?? 0),
        y: payload.y - (state.origin?.y ?? 0),
      };
      state.circlePointer = p;
      if (state.indexes.length === 0) {
        let sIndex = findNearestChar(state, p);
        state.indexes.push(sIndex);
        return state;
      }

      let sIndex = findCollapseChar(state, p);
      if (sIndex === -1) {
        return state;
      }
      if (!state.indexes.includes(sIndex)) {
        state.indexes.push(sIndex);
        return state;
      }

      if (state.indexes.length < 2) {
        return state;
      }

      if (state.indexes[state.indexes.length - 2] === sIndex) {
        state.indexes.pop();
      }
    },
  },
});
const playReducer = slice.reducer;
export default playReducer;
export const {
  onGestureMove,
  onSetupGame,
  onGestureRelease,
  onSetOriginPoint,
  onUseHint,
  onUseShowWord,
} = slice.actions;
