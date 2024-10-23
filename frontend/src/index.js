import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируйте createRoot из 'react-dom/client'
import App from './App'; // Импортируйте ваш компонент App
import store from './store/store';
import { Provider } from 'react-redux';

const rootElement = document.getElementById('root'); // Найдите корневой элемент
const root = ReactDOM.createRoot(rootElement); // Создайте корневой узел с помощью createRoot
root.render(
  <React.StrictMode>
    <Provider store={store}>
                    <App />
    </Provider>
  </React.StrictMode>
);
