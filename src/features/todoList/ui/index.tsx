import React from 'react';
import './TodoList.less';
type Props = {
  children: React.ReactNode;
};

const TodoList: React.FC<Props> = ({ children }) => {
  return <div className="todo-wrapper">{children}</div>;
};

export default TodoList;
