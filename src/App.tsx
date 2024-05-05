import 'bootstrap/dist/css/bootstrap.min.css';
import Fridge from './features/fridge/ui';
import Header from './features/header/ui';
import TodoItem from './features/todoItem/ui';
import TodoList from './features/todoList/ui';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Todo } from './types/types';
import AddTodoModal from './features/addTodoModal/ui';


import note from './assets/note.png';
const App: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleSaveTodo = (newTodo: Todo) => {
    const updatedTodoList = [...todoList, newTodo];
    setTodoList(updatedTodoList);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  };

  // Загрузка todoList из localStorage при загрузке компонента
  useEffect(() => {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);
  return (
    <div>
      <Header/>
      <Fridge children={
       <>
        <Button variant='link' as='a' onClick={handleShowModal} className='position-relative '>
          <span className="rope"></span> {/* Веревочка */}
          <img src={note} alt="Добавить задачу" />
        </Button>
          <TodoList>
          {
                  todoList.map((item) => 
                    <TodoItem todo={item} key={item.id}/>
                  )
          }
        </TodoList> 
       

      <AddTodoModal show={showModal} onClose={handleCloseModal} onSave={handleSaveTodo} />
       </>
      }/>
           
            
    </div>
  );
};

export default App;

