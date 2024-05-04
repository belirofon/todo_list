import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { 
  // Accordion, 
  // Button, 
  // Modal, 
  // Form 
} from 'react-bootstrap';
// import React, {  useState } from 'react';
// import todoList from './shared/data/todoList';
import Fridge from './features/fridge/ui';
import Header from './features/header/ui';

const App: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');

  // const handleCloseModal = () => setShowModal(false);
  // const handleShowModal = () => setShowModal(true);

  // const handleAddTodo = () => {
  //   // Здесь можно добавить логику для сохранения todo
  //   console.log('Добавлено:', { title, description });
  //   setTitle('');
  //   setDescription('');
  //   handleCloseModal();
  // };

  return (
    <div>
      <Header/>
      <Fridge/>

      {/* <Button variant="primary absolute" onClick={handleShowModal}>Добавить</Button>
      <Button variant="danger absolute">Удалить</Button> */}

      {/* <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleAddTodo}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>

      <Accordion defaultActiveKey="0" flush>
        {
          todoList.map((item) => 
              <Accordion.Item eventKey={item.id} key={item.id}>
                <Accordion.Header>
                  <p>{item.title}</p>
                  <p className="text-muted">{item.createdAt.toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p>{item.description}</p>
                  <p className="text-muted">{item.updatedAt.toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
          )
        }
      </Accordion> */}
    </div>
  );
};

export default App;

