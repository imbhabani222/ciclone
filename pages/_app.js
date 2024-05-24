import React from "react";
import "../styles/globals.css";
import '../css/main.css';
import Layout from "../components/Layout/Layout";
import {Provider} from 'react-redux';
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../components/reducer/reducer";
import  appRootSaga from "../components/saga/saga";

function MyApp({ Component, pageProps }) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: { data: reducer },
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(appRootSaga);
  return (
    <Provider  store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
