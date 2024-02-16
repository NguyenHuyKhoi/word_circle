export enum APP_SCREEN {
  PLAY = 'PLAY',
  LEVEL = 'LEVEL',
  MAIN_APP = 'MAIN_APP',
}

export type RootStackParamList = {
  [APP_SCREEN.MAIN_APP]: undefined;
  [APP_SCREEN.PLAY]: undefined;
  [APP_SCREEN.LEVEL]: undefined;
};
