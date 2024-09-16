// src/components/ReorderList.tsx
import React, { useState } from 'react';
import Card from './Card';
import './ReorderList.css';

interface Item {
  id: number;
  text: string;
}

interface ReorderListProps {
  items: Item[];
}

const ReorderList: React.FC<ReorderListProps> = ({ items: initialItems }) => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
    setSelectedIndex(hoverIndex);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const isSelected = selectedIndex === index;
    if (isSelected) {
      if (event.key === 'ArrowUp' && index > 0) {
        event.preventDefault();
        moveCard(index, index - 1);
      } else if (event.key === 'ArrowDown' && index < items.length - 1) {
        event.preventDefault();
        moveCard(index, index + 1);
      }
    } else {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }
    }
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div className="container">
      {items.map((item, index) => (
        <Card
          key={item.id}
          index={index}
          id={item.id}
          text={item.text}
          moveCard={moveCard}
          onKeyDown={handleKeyDown}
          isSelected={selectedIndex === index}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default ReorderList;
