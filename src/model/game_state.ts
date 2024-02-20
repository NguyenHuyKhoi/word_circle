export interface GameState {
  categories: CategoryEntity[];
  cat_id: number;
}
export interface CategoryEntity {
  id: number;
  char_count: number;
  total_levels: number;
  win_levels: number;
}
