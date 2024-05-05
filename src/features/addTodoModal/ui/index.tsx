import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Todo } from '../../../shared/types/types';

type AddTodoModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: (todo: Todo) => void;
  id?:  string;
};

const AddTodoModal: React.FC<AddTodoModalProps> = ({ show, onClose, onSave, id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todo, setTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList') || '[]') as Todo[];
    const foundTodo = storedTodoList.find((item) => item.id === id);
    if (foundTodo) {
      setTodo(foundTodo);
      setTitle(foundTodo.title);
      setDescription(foundTodo.description);
    }
  }, [id]);


  const handleNewSave = () => {
    
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
  const handleEditSave = () => {
    if (!title.trim() || !todo) return;
  
    const updatedTodo: Todo = {
      ...todo,
      title: title.trim(),
      description: description.trim(),
      updatedAt: new Date(),
    };
  
    const storedTodoList = JSON.parse(localStorage.getItem('todoList') || '[]') as Todo[];
    const updatedTodoList = storedTodoList.map((item) => (
      item.id === id ? updatedTodo : item
    ));
  
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList)); // Обновляем весь список в localStorage
  
    onSave(updatedTodo);
    onClose();
  };
  
  return (
   <>
      {
        id !== undefined
      &&
      <Modal show={show} onHide={onClose} className="edit-todo-modal">
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
        <Button variant="primary" onClick={handleEditSave}>
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
      }
      {
       !id &&  <Modal show={show} onHide={onClose}>
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
          <Button variant="primary" onClick={handleNewSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
      }
      
   </>
  
  );
};

export default AddTodoModal;
