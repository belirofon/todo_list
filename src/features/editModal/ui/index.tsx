import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Todo } from '../../../types/types';
import './editTodoModal.less'; // Импортируем стили

type EditTodoModalProps = {
  show: boolean;
  onClose: () => void;
  onSave?: (updatedTodo: Todo) => void;
  todoId: string;
};

const EditTodoModal: React.FC<EditTodoModalProps> = ({ show, onClose, onSave, todoId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList') || '[]') as Todo[];
    const foundTodo = storedTodoList.find((item) => item.id === todoId);
    if (foundTodo) {
      setTodo(foundTodo);
      setTitle(foundTodo.title);
      setDescription(foundTodo.description);
    }
  }, [todoId]);

  const handleSave = () => {
    if (!title.trim() || !todo) return;

    const updatedTodo: Todo = {
      ...todo,
      title: title.trim(),
      description: description.trim(),
      updatedAt: new Date(),
    };

    const storedTodoList = JSON.parse(localStorage.getItem('todoList') || '[]') as Todo[];
    const updatedTodoList = storedTodoList.map((item) => (item.id === todoId ? updatedTodo : item));
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));

    onSave && onSave(updatedTodo);

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} className="edit-todo-modal"> {/* Применяем стили */}
      <Modal.Header closeButton>
        <Modal.Title>Редактировать задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Заголовок</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок"
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTodoModal;
