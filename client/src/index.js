import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/inter';
import App from './App';
import { init } from '@rematch/core'
import { Provider } from 'react-redux'

import * as models from './redux_models/models'

const store = init({
	models,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
			<App />
		</Provider>
  </React.StrictMode>
);
