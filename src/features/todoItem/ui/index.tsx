import React from 'react';
import { Card } from 'react-bootstrap';
import { Todo } from '../../../types/types';
import './TodoItem.less';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    // Преобразуем строки в объекты Date
    const createdAt = new Date(todo.createdAt);
    const updatedAt = new Date(todo.updatedAt);
  return (
    <Card className="todo-card p-2">
        <div className="details">
        <span className="created-at">Created: {createdAt.toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  })}</span>
          <br />
          <span className="updated-at">Updated: {updatedAt.toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}</span>
        </div>
        <Card.Body>
          <Card.Title as = "p">{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
        </Card.Body>
      </Card>
  ) 
}


export default TodoItem;