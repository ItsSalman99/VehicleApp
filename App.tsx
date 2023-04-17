import React from 'react';
import Navigation from './src/navigations/Navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import loginReducer from './src/store/reducers/rootreducer.js';


const store = createStore(loginReducer);

const App = () => {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;