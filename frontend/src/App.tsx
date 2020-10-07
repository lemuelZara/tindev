import React from 'react';
import './App.css';

const App: React.FC = () => {
  const luke = {
    jedi: true,
    age: 28,
    name: 'a',
  };

  // bad
  const isJedi = luke.age;

  return (
    <div className="App">
      <h1> Tindev</h1>
    </div>
  );
};

export default App;
