//index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import userStore from './reducers/user';
import { Provider } from 'react-redux';

userStore.subscribe(() => {
  //console.log(userStore.getState());

  ""
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={userStore}>
      <App />
    </Provider>
  </React.StrictMode>
);