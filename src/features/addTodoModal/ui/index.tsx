import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Todo } from '../../../types/types';

type AddTodoModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => void;
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({ show, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title.trim()) return; // Не сохраняем, если заголовок пустой
    const storedTodoList = JSON.parse(localStorage.getItem('todoList') || '[]') as Todo[]; // Получаем список из localStorage
    const newTodo: Todo = {
      id: (storedTodoList.length + 1).toString(), // Уникальный ID: длина текущего списка + 1
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onSave(newTodo); // Сохраняем новый todo
    onClose(); // Закрываем модальное окно
    setTitle(''); // Очищаем поля после сохранения
    setDescription('');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новую задачу</Modal.Title>
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
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodoModal;
