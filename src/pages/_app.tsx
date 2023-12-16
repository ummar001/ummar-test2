import { queryClient } from "@/common/api";
import { ProgressProvider, SnackBarProvider } from "@/common/hooks";
import { LayoutController } from "@/common/layout";
import { persistor, store } from "@/common/store";
import { theme } from "@/common/theme";
import { i18n } from "@/common/translations";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { type FunctionComponent } from "react";
import { I18nextProvider } from "react-i18next";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@/common/style/table.css";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <SnackBarProvider>
              <LayoutController>
                <ProgressProvider>
                  <I18nextProvider i18n={i18n}>
                    <Component {...pageProps} />
                  </I18nextProvider>
                </ProgressProvider>
              </LayoutController>
            </SnackBarProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
