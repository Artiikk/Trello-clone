import React, { useState, FormEvent, DragEvent } from 'react';

import { Plans } from '../../pages/Homepage';
import Card from '../Card';

interface ColumnInterface {
  columnIdx: number;
  currentItem: Plans;
  setPlans: (plans: Plans[]) => void;
  plans: Plans[]
  dragItem: any;
  dragNode: any;
}

export interface CardInterface {
  columnIdx: number; 
  cardIdx: number;
}

const Column = ({ columnIdx, currentItem, plans, setPlans, dragItem, dragNode } : ColumnInterface) => {
  const { title, items } = currentItem;
  const [fix, setFix] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [dragging, setDragging] = useState<boolean>(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const duplicate = items.find(el => el === text); 
    if (!text || duplicate) return;

    const newPlans = [...plans];
    newPlans[columnIdx].items = [...newPlans[columnIdx].items, text];
    setPlans(newPlans);

    setText('');
    setFix(false);
  }

  const dragStart = (e: DragEvent<HTMLDivElement>, params: CardInterface) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', dragEnd);
    setTimeout(() => setDragging(true), 0);
  }

  const dragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener('dragend', dragEnd);
    dragItem.current = null;
    dragNode.current = null;
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>, params: CardInterface) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      const newPlans = [...plans];
      newPlans[params.columnIdx].items.splice(params.cardIdx, 0, newPlans[currentItem.columnIdx].items.splice(currentItem.cardIdx, 1)[0]);
      dragItem.current = params;
      setPlans(newPlans)
    }
  }

  return (
    <div
      className='column droppable'
      onDragEnter={!currentItem.items.length ? event => handleDragEnter(event, { columnIdx, cardIdx: 0 }) : () => ''}
    >
      <h3>{title}</h3>
      <Card 
        items={items} 
        columnIdx={columnIdx} 
        handleDragEnter={handleDragEnter} 
        dragItem={dragItem} 
        dragStart={dragStart}
        dragging={dragging}
      />

      {!fix && <button className='default-button' onClick={() => setFix(true)}>+ Add one more card</button>}
      {fix && <form className='default-form' onSubmit={e => submit(e)}>
          <input className='default-input' type='text' value={text} onChange={e => setText(e.target.value)} />
          <button className='default-button' type='submit'>+ Add card</button>
        </form>}
    </div>
  );
}

export default Column
