import {WordEntity} from './play_state';

export interface LevelEntity {
  table: string[][];
  chars: string[];
  words: WordEntity;
}
