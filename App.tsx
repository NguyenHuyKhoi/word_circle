import {AppContainer} from '@navigation/AppNavigator';
import * as React from 'react';
import {FC, Suspense} from 'react';
import {I18nextProvider} from 'react-i18next';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '@store';
import i18next from './src/utils/i18n/i18n';
import Orientation from 'react-native-orientation-locker';
interface AppProps {}
export const App: FC<AppProps> = ({}) => {
  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18next}>
            <Suspense fallback={null}>
              <AppContainer />
            </Suspense>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
