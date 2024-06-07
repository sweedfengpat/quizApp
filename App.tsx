import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import StackNavigator from './src/nevigation/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
