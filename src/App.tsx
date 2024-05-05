import 'bootstrap/dist/css/bootstrap.min.css';
import Fridge from './features/fridge/ui';
import Header from './features/header/ui';
import TodoItem from './features/todoItem/ui';
import TodoList from './features/todoList/ui';
import { Button, Tab, Tabs } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Todo } from './shared/types/types';
import AddTodoModal from './features/addTodoModal/ui';

import note from './assets/note.png';
// import TabsTodoLinks from './features/tabs/ui';
const App: React.FC = () => {

  const [showModal, setShowModal] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoId, setTodoId] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('name'); // Текущая активная вкладка
  const handleSaveTodo = (newTodo: Todo) => {
    const existingTodoIndex = todoList.findIndex((todo) => todo.id === newTodo.id);
  
    if (existingTodoIndex !== -1) {
      // Если уже существует todoItem с таким id, обновляем его
      const updatedTodoList = todoList.map((todo, index) => (index === existingTodoIndex ? newTodo : todo));
      setTodoList(updatedTodoList);
      localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    } else {
      // Если не существует, добавляем новый todoItem
      const updatedTodoList = [...todoList, newTodo];
      setTodoList(updatedTodoList);
      localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
    }
  };
  const handleDelete = (id: string) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodoList(updatedTodoList);
    localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  };
  const toggleModal = () => {
    
    setShowModal(!showModal);
  }
  const getItemId = (id: string | undefined) => {
    setTodoId(id);
    toggleModal();
    
  }

  // Загрузка todoList из localStorage при загрузке компонента
  useEffect(() => {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);
  // Функция для обработки смены активной вкладки
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Функция для получения правильной сортировки в зависимости от выбранной вкладки
  const getSortedTodoList = () => {
    switch (activeTab) {
      case 'name':
        return [...todoList].sort((a, b) => a.title.localeCompare(b.title));
      case 'createdAt':
        return [...todoList].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'updatedAt':
        return [...todoList].sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      default:
        return todoList;
    }
  };
  return (
    <div>
      <Header/>
      <Fridge children={
       <>
        <Button variant='link' as='a' onClick={() => getItemId(undefined)} className='position-relative '>
          <span className="rope"></span>
          <img src={note} alt="Добавить задачу" />
        </Button>
            <Tabs className='tabs' justify activeKey={activeTab} onSelect={(key) => handleTabChange(key as string)}>
                <Tab eventKey="name" title="По названию">
                   <TodoList>
                      {getSortedTodoList().map((item) => (
                        <TodoItem key={item.id} todo={item} onClick={() => getItemId(item.id)} handleDelete={() => handleDelete(item.id)} />
                      ))}
                   </TodoList>
                </Tab>
                <Tab eventKey="createdAt" title="По созданию">
                    <TodoList>
                      {getSortedTodoList().map((item) => (
                        <TodoItem key={item.id} todo={item} onClick={() => getItemId(item.id)} handleDelete={() => handleDelete(item.id)} />
                      ))}
                    </TodoList>
                </Tab>
                <Tab eventKey="updatedAt" title="По обновлению">
                   <TodoList>
                      {getSortedTodoList().map((item) => (
                        <TodoItem key={item.id} todo={item} onClick={() => getItemId(item.id)} handleDelete={() => handleDelete(item.id)} />
                      ))}
                   </TodoList>
                </Tab>
            </Tabs>
        {/* <TabsTodoLinks todoList={[]} handleSortChange={function (sortType: string): void {
              throw new Error('Function not implemented.');
            } } />
            
          {
                  todoList.map((item) => 
                      <TodoItem todo={item} key={item.id} onClick={() => getItemId(item.id)} handleDelete={() => handleDelete(item.id)}/>
                  )
          } */}
       

        <AddTodoModal show={showModal} onClose={toggleModal} onSave={handleSaveTodo} id={todoId}/>
       </>
      }/>
           
            
    </div>
  );
};

export default App;

