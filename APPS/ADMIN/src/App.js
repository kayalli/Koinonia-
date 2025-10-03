import React from 'react';
import PeopleList from './components/PeopleList';
import ImportWizard from './components/ImportWizard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Koinonia Phase 1 Admin</h1>
      <ImportWizard />
      <PeopleList />
    </div>
  );
}

export default App;
