import {ALL_CATEGORIES} from '@config';
import {GameState} from '@models';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';
const initialState: GameState = {
  categories: [...ALL_CATEGORIES].map(item => ({...item, win_levels: 0})),
  cat_id: 0,
};

const slice = createSlice({
  name: 'APP_STATE',
  initialState: initialState,
  reducers: {
    onSelectCategory: (state, {payload}: PayloadAction<number>) => {
      state.cat_id = payload;
    },
    onWinLevel: state => {
      const cat = state.categories[state.cat_id];
      if (cat.win_levels < cat.total_levels - 1) {
        state.categories[state.cat_id].win_levels++;
      }
    },
  },
});
const gameReducer = slice.reducer;
export default gameReducer;
export const {onSelectCategory, onWinLevel} = slice.actions;
