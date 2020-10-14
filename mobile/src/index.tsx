import React from 'react';
import { LogBox } from 'react-native';

import Routes from './routes';

LogBox.ignoreLogs(['Unrecognized WebSocket']);

const App = () => {
  return <Routes />;
};

export default App;
