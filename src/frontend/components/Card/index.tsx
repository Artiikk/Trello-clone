import React, { DragEvent } from 'react'

import { CardInterface } from '../../components/Column'

interface CardProps {
  columnIdx: number;
  items: Array<string>;
  dragItem: any;
  handleDragEnter: (e: DragEvent<HTMLDivElement>, props: CardInterface) => void;
  dragStart: (e: DragEvent<HTMLDivElement>, props: CardInterface) => void;
  dragging: boolean;
}

const Card = ({ columnIdx, items, dragItem, handleDragEnter, dragStart, dragging } : CardProps) => {
  const getStyles = (params: CardInterface) => {
    const currentItem = dragItem.current;
    if (currentItem.columnIdx === params.columnIdx && currentItem.cardIdx === params.cardIdx) {
      return 'card current'
    }
    return 'card'
  }

  return (
    <div>
      {items.map((title: string, cardIdx: number) =>
        <div
          key={title}
          draggable
          className={dragging ? getStyles({ columnIdx, cardIdx }) : 'card'}
          onDragStart={e => dragStart(e, { columnIdx, cardIdx })}
          onDragEnter={e => handleDragEnter(e, { columnIdx, cardIdx })}
        >
          <p>{title}</p>
        </div>
      )}
    </div>
  )
}

export default Card
