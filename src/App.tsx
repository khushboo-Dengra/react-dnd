import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReorderList from './components/ReorderList';
import './App.css';

const initialItems = [
  { id: 1, text: 'Performance Summary' },
  { id: 2, text: 'Performance Benchmarking' },
  { id: 3, text: 'Performance Detail (Includes Sold Positions)' },
];

const App: React.FC = () => {
  
  return (
    <DndProvider backend={HTML5Backend}>
      <ReorderList items={initialItems}/>
    </DndProvider>
  );
};

export default App;