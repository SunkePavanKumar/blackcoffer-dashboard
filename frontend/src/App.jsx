import React from 'react';
import Header from './components/Header';
import Filters from './components/Filters';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Header />
      <Filters />
      <Dashboard />
    </div>
  );
};

export default App;
