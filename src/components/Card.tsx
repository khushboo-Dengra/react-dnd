import React, { useRef } from 'react';
import { useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import './Card.css';

interface CardProps {
  id: number;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => void;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
}

const Card: React.FC<CardProps> = ({ id, text, index, moveCard, onKeyDown, isSelected, onSelect }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [, drop] = useDrop<DragItem>({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
      onSelect(index);
    } else {
      onKeyDown(event, index);
    }
  };

  return (
    <button
      ref={ref}
      className={`card-container ${isDragging ? 'is-dragging' : ''} ${isSelected ? 'is-selected' : ''}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-selected={isSelected}
      style={{ backgroundColor: isSelected ? 'lightblue' : 'white', cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div className="drag-handle">☰</div>
      {text}
    </button>
  );
};

export default Card;
