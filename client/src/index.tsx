import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './components/AppRouter';
import store from "./store/store"
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import { createRoot }  from "react-dom/client";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);



