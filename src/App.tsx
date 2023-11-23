import { themeConstants, localStorageConstants, localeConstants } from '@/constants';
import { history } from '@/constants/history';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { LocaleFormatter } from '@/locales';

import { localeConfig, locales } from '@/locales/localeConfig';
import { HistoryRouter } from '@/routes/history';
import RenderRouter from '@/routes/renderRouter';
import { setGlobalState } from '@/stores/global.store';
import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi.js';
import React, { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';

const App: React.FC = () => {
  const { locale } = useAppSelector(state => state.user);
  const { theme, loading } = useAppSelector(state => state.global);
  const dispatch = useAppDispatch();

  const setTheme = (dark = true) => {
    dispatch(
      setGlobalState({
        theme: dark ? themeConstants.DARK : themeConstants.LIGHT,
      }),
    );
  };

  useEffect(() => {
    setTheme(theme === themeConstants.DARK);

    // watch system theme change
    if (!localStorage.getItem(localStorageConstants.THEME)) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      // eslint-disable-next-line no-inner-declarations
      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);

  useEffect(() => {
    if (locale === localeConstants.VI_VN) {
      dayjs.locale('vi');
    } else if (locale === localeConstants.EN_US) {
      dayjs.locale('en');
    }
  }, [ locale ]);

  return (
    <ConfigProvider
      locale={ locales[locale].antdLocale }
      componentSize="middle"
      theme={ {
        token: { colorPrimary: '#13c2c2' },
        algorithm: theme === themeConstants.DARK ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      } }
    >
      <IntlProvider locale={ locale.split('_')[0] } messages={ localeConfig[locale] }>
        <HistoryRouter history={ history }>
          <Suspense fallback={ null }>
            <Spin
              spinning={ loading }
              className="app-loading-wrapper"
              style={ {
                backgroundColor: theme === themeConstants.DARK ? 'rgba(0, 0, 0, 0.44)' : 'rgba(255, 255, 255, 0.44)',
              } }
              tip={ <LocaleFormatter id="global.tips.loading"/> }
            ></Spin>
            <RenderRouter/>
          </Suspense>
        </HistoryRouter>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
